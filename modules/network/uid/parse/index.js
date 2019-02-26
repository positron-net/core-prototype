module.exports = (uid) => {
  let a = Buffer.from(uid, 'base64').toString().split('.')

  return {
    mac: a[0],
    ip: Buffer.from(a[1], 'hex').toString(),
    timeKey: a[2]
  }
}