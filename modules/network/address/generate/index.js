const addr = require('address')
const publicIp = require('public-ip')
const macaddress = require('macaddress')

module.exports = () => {
  return new Promise(resolve => {
    const address = {
      ip: undefined,
      mac: undefined,
      key: new Date().getTime().toString(16)
    }

    macaddress.one((err, mac) => {
      if (err) {
        console.log(err)
      } else {
        address.mac = Buffer.from(mac).toString('base64').replace('=', '')
      }
    })
    
    //address.mac = Buffer.from('57:AA:AA:AA:AA:AA').toString('hex').replace('=', '')

    publicIp.v4().then(ip => {
      address.ip = Buffer.from(ip).toString('base64').replace('=', '')

      resolve(`${address.mac}.${address.ip}.${address.key}`)
    })
  })
}