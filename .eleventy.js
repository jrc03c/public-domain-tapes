const fs = require("fs")
const path = require("path")

module.exports = function (config) {
  config.addGlobalData("site", {
    title: "Public Domain Tapes",
    subtitle: "Records of the Commons",
    description:
      "The Public Domain Tapes podcast is a love letter to the public domain. Each episode is an audio collage using public domain sources that all center around a specific theme. I hope you enjoy it!",
    author: "Josh Castle",
    email: "josh@ameyama.com",
    url: "https://publicdomaintapes.com",
    explicit: "yes",
    logo: "/res/img/logo-sq.png",
    category: "Arts",
    subcategory: "Performing Arts",
    permalink: "/ep/:title",
    include: ["_pages"],
  })

  config.addFilter("prettify-date", date => {
    date = new Date(date)
    const day = date.getDate().toString()
    const month = date.getMonth().toString()
    const year = date.getFullYear().toString()

    return `${year}-${month.length < 2 ? "0" + month : month}-${
      day.length < 2 ? "0" + day : day
    }`
  })

  config.addFilter("keys", obj => {
    try {
      return Object.keys(obj).join(", ")
    } catch (e) {
      return "null"
    }
  })

  fs.readdirSync("src/static").forEach(item => {
    const obj = {}
    obj["src/static/" + item] = item
    config.addPassthroughCopy(obj)
  })

  return {
    dir: {
      input: "src",
      layouts: "layouts",
      output: "dist",
    },
  }
}
