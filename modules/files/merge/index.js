module.exports = (buffers) => {
  return new Promise((resolve, reject) => {
    let file = []

    for (i in buffers) {
  
      let bufferChecksum = Buffer.from(buffers[i].buffer).toString('base64')
  
      if (bufferChecksum !== buffers[i].checksum) {
        reject('File corrupted')
      } else {
        file.push(buffers[i].buffer)
      }
    }
    
    resolve({
      checksum: Buffer.from(Buffer.concat(file)).toString('base64'),
      buffer: Buffer.concat(file)
    })
  })
}