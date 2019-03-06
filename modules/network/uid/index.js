const { pbkdf2 } = require('crypto')

const randomId = Math.floor(1000 + Math.random() * 9999)

module.exports = (user, password) => {
  return new Promise(resolve => {
    pbkdf2(user, password, 100000, 12, 'sha512', (err, derivedKey) => {
      if (err) throw err
      resolve({
        username: `${user}#${randomId}`,
        uid: derivedKey.toString('hex')
      })
    })
  })
}