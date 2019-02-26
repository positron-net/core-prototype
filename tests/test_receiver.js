const { network, files } = require('../index.js')
const zlib = require('zlib')

const NET = require('./config_test.json')

network.connection.receiver.listen(NET.RECEIVER_PORT).then((socket) => {
  console.log(`[RECEIVER] > listening on ${NET.RECEIVER_PORT}`)
 
  network.connection.receiver.punch(NET.SENDER_ADDRESS, NET.SENDER_PORT)
  .then(() => {
    console.log(`[RECEIVER] > connected to [${NET.SENDER_ADDRESS}:${NET.SENDER_PORT}]`)
  })
  .catch(() => console.log(`[RECEIVER] > ERROR on connecting to [${NET.SENDER_ADDRESS}:${NET.SENDER_PORT}]`))
})

let finalFile = []

EventsEmitter.on('RECEIVER_DATA', (d) => {
  if (d.initialSize === Buffer.from(d.buffer).length) {
    d.buffer = Buffer.from(d.buffer)
  } else {
    d.buffer = zlib.inflateRawSync(Buffer.from(d.buffer))
  }

  console.log(`====================== ${d.id} ======================`)
  console.log(d.buffer.toString())
})