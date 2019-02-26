const { network } = require('../index')

network.connection.discover.getserver().then(server => {
  network.address.generate()
  .then(result => {
    network.connection.discover.connect(server, result)
    console.log(network.address.parse(result))
  })
  .catch(e => {
    console.log('[ERROR] > No internet connection !')
  })
})