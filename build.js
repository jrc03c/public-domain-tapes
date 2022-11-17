const { Liquid } = require("liquidjs")
const Eleventy = require("@11ty/eleventy")
const express = require("express")
const fs = require("fs")
const lodash = require("lodash")
const MarkdownIt = require("markdown-it")
const matter = require("gray-matter")
const watch = require("@jrc03c/watch")

let isBuilding = false
let shouldRebuildImmediately = false

function bold(x) {
  return `\x1b[1m${x}\x1b[0m`
}

function accent(x) {
  return `\x1b[33m${x}\x1b[0m`
}

async function build() {
  if (isBuilding) {
    shouldRebuildImmediately = true
    return
  }

  isBuilding = true
  console.log("=====")
  console.log(accent(bold(`Building... (${new Date().toLocaleString()})`)))

  // build main site
  const eleventy = new Eleventy()
  await eleventy.write()

  // build rss
  const md = new MarkdownIt()

  const rssData = {
    site: require("./site-data.js"),

    episodes: fs
      .readdirSync("src/posts")
      .map(file => {
        return { filename: file, raw: fs.readFileSync("src/posts/" + file) }
      })
      .map(obj => {
        obj.parsed = matter(obj.raw)
        return obj
      })
      .map(obj => {
        const out = obj.parsed
        const date = new Date(obj.filename.split("-").slice(0, 3).join("-"))
        out.data.date = date.toUTCString()
        out.data.summary = lodash.escape(out.data.summary)
        out.content = lodash.escape(md.render(out.content))
        return out
      }),
  }

  const rssTemplate = fs.readFileSync("src/rss.xml", "utf8")
  const liquid = new Liquid()
  const rss = await liquid.parseAndRender(rssTemplate, rssData)
  fs.writeFileSync("dist/rss.xml", rss, "utf8")

  // done!
  console.log("Built!")
  isBuilding = false

  if (shouldRebuildImmediately) {
    shouldRebuildImmediately = false
    build()
  }
}

const shouldServe = process.argv.indexOf("--serve") > -1
const shouldWatch = shouldServe || process.argv.indexOf("--watch") > -1

if (shouldWatch) {
  watch({
    target: ".",
    exclude: ["dist"],
    created: build,
    modified: build,
    deleted: build,
  })
}

if (shouldServe) {
  const app = express()

  app.use("/", express.static("dist", { extensions: ["html"] }))

  app.listen(3000, () => {
    console.log("Listening at http://localhost:3000...")
  })
}

build()
