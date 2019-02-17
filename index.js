core = {
  files: {
    split: require('./modules/files/split'),
    merge: require('./modules/files/merge'),
  },

  network: {
    address: {
      generate: require('./modules/network/address/generate'),
      parse: require('./modules/network/address/parse')
    },

    protocol: {
      discover: require('./modules/network/protocol/discover'),
      download: require('./modules/network/protocol/download'),
      upload: require('./modules/network/protocol/upload')
    }
  }
}

module.exports = core