const { pbkdf2 } = require('crypto')

module.exports = (user, password) => {
  return new Promise(resolve => {
    pbkdf2(user, password, 100000, 12, 'sha512', (err, derivedKey) => {
      if (err) throw err
      resolve(derivedKey.toString('hex'))
    })
  })
}