const Node = require('utp-punch')

const sender = new Node()

module.exports = {

  bind (port) {
    return new Promise((resolve) => {
      sender.bind(port)
      resolve()
    })
  },

  connect (host, port) {
    return new Promise((resolve, reject) => {
      sender.punch(20, port, host, success => {
        if (success) {
          sender.connect(port, host, socket => {
            resolve(socket)
            
            socket.on('end', () => {
              sender.close()
              EventsEmitter.emit('SENDER_CONNECTION_END')
            })
          })
        } else {
          reject(false)
        }
      })
    })
  }

}