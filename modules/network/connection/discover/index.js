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
            ws = new WebSocket(`ws://${server.address}:8080/`)
            ws.on('open', () => {
                this.send('ADD_CLIENT', uid)
                resolve(ws)
            })
        })
    },

    getRandomClient () {
        // 
    }
}

module.exports = discover