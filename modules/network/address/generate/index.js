const addr = require('address')
const publicIp = require('public-ip')

module.exports = () => {
  return new Promise(resolve => {
    const address = {
      ip: undefined,
      mac: undefined,
      key: new Date().getTime().toString(16)
    }

    addr.mac((err, mac) => {
      address.mac = Buffer.from(mac).toString('base64').replace('=', '')
    })
  
    publicIp.v4().then(ip => {
      address.ip = Buffer.from(ip).toString('base64').replace('=', '')

      resolve(`${address.mac}.${address.ip}.${address.key}`)
    })
  })
}