requestAdapter = require './request-adapter'
argParser = require './arg-parser'

request = (method, args...) ->
  opts = argParser.parse method, args
  requestAdapter.makeRequest opts.config, opts.callback

module.exports =
  get: request.bind null, 'get'
  post: request.bind null, 'post'
  delete: request.bind null, 'delete'
  put: request.bind null, 'put'
  head: request.bind null, 'head'
