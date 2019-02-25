const fs = require('fs')

module.exports = (path, parts) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      
      let i = 0
      let part = 0
      let result = []

      while (i < data.length) {
        let buffer = data.slice(i, i += Math.round(data.length / parts))

        let fileData = {
          id: part,
          checksum: Buffer.from(buffer).toString('base64'),
          buffer: buffer
        }
        
        result.push(fileData)

        part++
      }

      resolve(result)
    })
  })
}