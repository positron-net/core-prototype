const fs = require('fs')
const zlib = require('zlib')

module.exports = (path) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {

      data = zlib.deflateSync(data)

      let i = 0
      let part = 0
      let result = []

      while (i < data.length) {
        let buffer = data.slice(i, i += 6400)

        let fileData = {
          id: part,
          buffer: buffer
        }

        result.push(fileData)

        part++
      }

      resolve(result)
    })
  })
}