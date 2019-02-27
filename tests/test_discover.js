const { network } = require('../index')

network.connection.discover.getServer().then(server => {
  network.uid('jeankeke21#5673', 'boobakaaris2019').then(uid => {
    console.log(uid)
    network.connection.discover.connect(server, uid).then(socket => {

      socket.on('message', msg => {
        msg = JSON.parse(msg)
        console.log(msg)
      })
      network.connection.discover.send('GET_CLIENT', uid)

    })
  })
})