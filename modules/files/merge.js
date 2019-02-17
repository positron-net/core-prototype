const BufferList = require('bl')
const fs = require('fs')

const bl = new BufferList()

module.exports = (buffers) => {
  for (i in buffers) {

    let bufferChecksum = Buffer.from(buffers[i].buffer).toString('base64')

    if (bufferChecksum !== buffers[i].checksum) {
      console.log('File corrupted')
    } else {
      bl.append(buffers[i].buffer)
    }
  }
  
  return {
    checksum: Buffer.from(Buffer.concat(bl._bufs)).toString('base64'),
    buffer: Buffer.concat(bl._bufs)
  }
}