const publicIp = require('public-ip')
const macaddress = require('macaddress')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const uid = {
      ip: undefined,
      mac: undefined,
      key: new Date().getTime().toString(16)
    }

    macaddress.one((err, mac) => {
      if (err) {
        reject(err)
        // uid.mac = 'AA:AA:AA:AA:AA'
      } else {
        uid.mac = mac
      }
    })
    
    publicIp.v4()
    .then(ip => {
      uid.ip = Buffer.from(ip).toString('hex')
      resolve(Buffer.from(`${uid.mac}.${uid.ip}.${uid.key}`).toString('base64'))
    })
    .catch(e => {
      reject(e)
      // uid.ip = Buffer.from('1.1.1.1').toString('hex')
      // resolve(Buffer.from(`${uid.mac}.${uid.ip}.${uid.key}`).toString('base64'))
    })

  })
}

