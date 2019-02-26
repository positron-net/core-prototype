const { network } = require('../index')

network.connection.discover.getServer().then(server => {
  network.address.generate()
  .then(result => {
    network.connection.discover.connect(server, result).then(socket => {
      socket.on('message', (msg) => {
        msg = JSON.parse(msg)

        console.log(msg)
      })

      network.connection.discover.send('GET_CLIENT', result)
    })
  })
  .catch(e => {
    console.log('[ERROR] > No internet connection !')
  })
})