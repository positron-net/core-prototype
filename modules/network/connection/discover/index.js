const SockJS = require('sockjs-client')
const servers = require('./servers.json')

let sock

const discover = {
  getServer () {
    return new Promise(resolve => {
      const server = servers[Math.floor(Math.random() * servers.length)]
      resolve(servers[0])
    })
  },

  connect (server, uid) {
    return new Promise(resolve => {
      
      sock = new SockJS(`http://${server.address}:5112/echo`)

      console.log(`[INFO] > Connecting to ${server.name}...`)
      sock.onopen = () => {
        this.send('ADD_CLIENT', uid)
        resolve(sock)
      }
    })
  },


  send (message, content) {
    sock.send(JSON.stringify({
      message: message,
      content: content
    }))
  },

  getRandomClient () {
    return new Promise(resolve => {
      this.send('GET_RANDOM_CLIENT')
      sock.onmessage = msg => {
        if (msg.message === 'RES_GET_RANDOM_CLIENT') {
          resolve(msg.content)
        }
      }
    })
  }
}

module.exports = discover