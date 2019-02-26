const zlib = require('zlib')

module.exports = (buffers) => {
  return new Promise((resolve, reject) => {
    let file = []

    for (i in buffers) {

      if (buffers[i].initialSize > buffers[i].buffer.length) {
        file.push(zlib.inflateRawSync(buffers[i].buffer))
      } else {
        file.push(buffers[i].buffer)
      }

    }
    
    resolve(Buffer.concat(file))
  })
}