const WebSocket = require('ws')
const servers = require('./servers.json')

let ws

const discover = {
  getServer () {
    return new Promise(resolve => {
      // Temporary
      const server = servers[Math.floor(Math.random() * servers.length)]

      resolve(servers[0])
    })
  },

  connect (server, uid) {
    return new Promise(resolve => {
      ws = new WebSocket(`ws://${server.address}:5112/`)
      console.log(`[INFO] > Connecting to ${server.name}...`)
      ws.on('open', () => {
        this.send('ADD_CLIENT', uid)
        resolve(ws)
      })
    })
  },


  send (message, content) {
    ws.send(JSON.stringify({
      message: message,
      content: content
    }))
  },

  getRandomClient () {
    return new Promise(resolve => {
      this.send('GET_RANDOM_CLIENT')
      ws.on('message', msg => {
        if (msg.message === 'RES_GET_RANDOM_CLIENT') {
          resolve(msg.content)
        }
      })
    })
  }
}

module.exports = discover