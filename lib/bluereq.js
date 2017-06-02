const request = require('./promisified_request')
const parseArgs = require('./arg_parser')

const customRequest = function (method, ...args) {
  const opts = parseArgs(method, args)
  return request(opts.config, opts.callback)
}

module.exports = {
  get: customRequest.bind(null, 'get'),
  post: customRequest.bind(null, 'post'),
  delete: customRequest.bind(null, 'delete'),
  put: customRequest.bind(null, 'put'),
  head: customRequest.bind(null, 'head'),
  patch: customRequest.bind(null, 'patch')
}
