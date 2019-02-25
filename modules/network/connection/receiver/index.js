const Node = require('utp-punch')

const receiver = new Node(socket => {
  console.log('[RECEIVER] > socket connected')

  EventsEmitter.on('RECEIVER_TO_SENDER', data => {
    socket.write(JSON.stringify(data))
  })

  socket.on('data', data => {
    EventsEmitter.emit('RECEIVER_DATA', JSON.parse(data))
    socket.end()
  })

  socket.on('end', () => {
    console.log('[RECEIVER] > socket disconnected')
    receiver.close()
  })
})

module.exports = {
  server: receiver,

  listen (port) {
    return new Promise((resolve) => {
      receiver.bind(port)
      receiver.listen(() => resolve())
    })
  },

  punch (host, port) {
    return new Promise((resolve, reject) => {
      receiver.punch(20, port, host, success => {
        if (success) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}