module.exports = (address) => {
  let a = address.split('.')

  return {
    mac: Buffer.from(a[0], 'base64').toString(),
    ip: Buffer.from(a[1], 'base64').toString(),
    timeKey: a[2]
  }
}