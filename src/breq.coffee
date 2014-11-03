request = require "request"

RequestAdapter = require "./request-adapter"
ArgParser = require "./arg-parser"

class Breq

  request = (method, args) ->
    opts = ArgParser.parse(method, args)
    RequestAdapter.makeRequest opts.config, opts.callback

  @get: (args...) -> request "get", args

  @post: (args...) -> request "post", args

  @delete: (args...) -> request "delete", args

  @put: (args...) -> request "put", args

module.exports = Breq