const servers = require('./servers.json')

const discover = {
    getserver () {
        return new Promise(resolve => {
            // Temporary
            const location = {
                continent: 'EU',
                country: 'SE'
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

    connectToDiscover (server, uid) {
        // send uid to the server
        console.log(server.address, uid)
    },

    getRandomClient () {
        // 
    }
}

module.exports = discover