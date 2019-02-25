const core = {
  utils: {
    event: require('./modules/utils/event')
  },

  files: {
    merge: require('./modules/files/merge'),
    split: require('./modules/files/split')
  },

  network: {
    connection: {
      discover: require('./modules/network/connection/discover'),
      receiver: require('./modules/network/connection/receiver'),
      sender: require('./modules/network/connection/sender')
    },

    address: {
      generate: require('./modules/network/address/generate'),
      parse: require('./modules/network/address/parse')
    }
  }
}

module.exports = core