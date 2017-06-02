const getOpts = require('./get_options')
const haveData = [ 'POST', 'PUT', 'MATCH' ]

module.exports = function (method, args) {
  method = method.toUpperCase()
  const hasData = haveData.includes(method)
  const opts = getOpts(args, hasData)
  opts.config.method = method
  return opts
}
