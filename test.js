const core = require('./index.js')

/* Network tests */
// Generate address
core.network.address.generate().then(address => {
  // Parse address
  console.log(core.network.address.parse(address))
})

// Test receiver
core.network.connection.receiver.listen(5000).then(() => {
  console.log('listening...')
  // hole punch
  core.network.connection.receiver.punch('127.0.0.1', 4000)
  .then(() => {
    console.log('Sucess')
    EventsEmitter.emit('RECEIVER_TO_SENDER', {
      message: 'Hello world'
    })
  })
  .catch(() => {
    console.log('Error')
  })
})

core.network.connection.sender.bind(4000).then(() => {
  // hole punch
  core.network.connection.sender.connect('127.0.0.1', 5000)
  .then(socket => {
    console.log('[SENDER] > connected to receiver !')

    core.files.split('./test.js', 200).then(files => {
      // Merge file from buffers
      // core.files.merge(files).then(file => console.log(file.buffer))
      for (i in files) {
        socket.write(JSON.stringify(files[i]))
      }
    })

    socket.on('data', data => {
      console.log(`[SENDER] > data from server : ${data}`)
    })
  })
  .catch(() => console.log('Error'))
})

EventsEmitter.on('RECEIVER_DATA', data => {
  console.log(Buffer.from(data.buffer))
})