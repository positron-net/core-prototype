const WebSocket = require('ws')
const servers = require('./servers.json')

let ws

const discover = {
  getServer () {
    return new Promise(resolve => {
      // Temporary
      const location = {
        continent: 'EU',
        country: 'FR'
      }

      for (a in servers) {
        if (servers[a].continent === location.continent) {
          for (b in servers[a].servers) {
            if (servers[a].servers[b].country === location.country) {
              resolve(servers[a].servers[b])
              break
            }
          }
        }
      }
    })
  },

  send (message, content) {
    ws.send(JSON.stringify({
      message: message,
      content: content
    }))
  },

  connect (server, uid) {
    return new Promise(resolve => {
      ws = new WebSocket(`ws://${server.address}:5112/`)
      ws.on('open', () => {
        this.send('ADD_CLIENT', uid)
        resolve(ws)
      })
    })
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