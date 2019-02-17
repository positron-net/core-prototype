const core = require('./')

// split file
core.files.split('./index.js', 40).then((result) => {
  // merge file
  console.log(core.files.merge(result))
})

// generating address
core.network.address.generate().then((addr) => {
  // parse address
  console.log(core.network.address.parse(addr))
})