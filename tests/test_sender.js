const { network, files } = require('../index.js')

const NET = require('./config_test.json')

network.connection.sender.bind(NET.SENDER_PORT).then(() => {
  console.log(`[SENDER] > listening on ${NET.SENDER_PORT}`)

  network.connection.sender.connect(NET.RECEIVER_ADDRESS, NET.RECEIVER_PORT)
  .then(socket => {
    console.log(`[SENDER] > connected to [${NET.RECEIVER_ADDRESS}:${NET.RECEIVER_PORT}]`)

    files.split('./package.json', 10).then(buffers => {
      for (i in buffers) {
        socket.write(JSON.stringify(buffers[i]))
      }
    })

    socket.on('end', () => {
      socket.close()
    })
  })
  .catch(() => console.log(`[SENDER] > ERROR on connecting to [${NET.RECEIVER_ADDRESS}:${NET.RECEIVER_PORT}]`))
})