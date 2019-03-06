const zlib = require('zlib')

module.exports = (buffers) => {
  return new Promise((resolve, reject) => {
    let file = []

    for (i in buffers) {
      file.push(buffers[i].buffer)
    }
    
    resolve(zlib.inflateSync(Buffer.concat(file)))
  })
}