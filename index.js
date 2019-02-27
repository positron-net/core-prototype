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

    uid: require('./modules/network/uid')
  }
}

module.exports = core