const fs = require("fs")

module.exports = function (config) {
  config.addGlobalData("site", require("./site-data.js"))

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
