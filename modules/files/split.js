const BufferList = require('bl')
const fs = require('fs')

let bl = new BufferList()

module.exports = (path, parts) => {
  return new Promise((resolve) => {
    fs.createReadStream(path).pipe(BufferList((err, data) => {

      let i = 0
      let part = 0
      let result = []

      bl.append(data)

      while (i < bl.length) {
        let buffer = bl.slice(i, i += parts)
    
        let fileData = {
          id: part,
          checksum: Buffer.from(buffer).toString('base64'),
          buffer: buffer
        }
        
        result.push(fileData)

        part++
      }

      resolve(result)

    }))
  })
}