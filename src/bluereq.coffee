RequestAdapter = require "./request-adapter"
ArgParser = require "./arg-parser"

request = (method, args...) ->
  opts = ArgParser.parse(method, args)
  RequestAdapter.makeRequest opts.config, opts.callback


module.exports =
  get: request.bind null, 'get'
  post: request.bind null, 'post'
  delete: request.bind null, 'delete'
  put: request.bind null, 'put'
  head: request.bind null, 'head'
