const fs = require('fs')
const zlib = require('zlib')

module.exports = (path, parts) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      
      let i = 0
      let part = 0
      let result = []

      while (i < data.length) {
        let buffer = data.slice(i, i += Math.round(data.length / parts))
        let compressedBuffer = zlib.deflateRawSync(buffer)
        
        let finalBuffer

        if (compressedBuffer.length > buffer.length || compressedBuffer.length === buffer.length) {
          finalBuffer = buffer
          console.log(part, buffer.length, 'decompressed')
        } else {
          finalBuffer = compressedBuffer
          console.log(part, finalBuffer.length, buffer.length)
        }

        let fileData = {
          id: part,
          initialSize: buffer.length,
          buffer: finalBuffer
        }
        
        result.push(fileData)

        part++
      }

      resolve(result)
    })
  })
}