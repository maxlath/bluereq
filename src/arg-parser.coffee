signature = require './signature-checker'

module.exports =
  parse: (method, args) ->
    opts = {}
    method = method.toUpperCase()
    switch method
      when 'GET', 'DELETE', 'HEAD' then opts = @getOpts(args, false)
      when 'POST',  'PUT' then opts = @getOpts(args, true)
      else throw new Error 'Method must be GET, DELETE, POST, PUT or HEAD'
    opts.config.method = method
    return opts

  getOpts: (args, hasData = false) ->
    opts = {}
    # get(url) or delete(url) or post(url) or put(url) or head(url)
    if signature.matches(args, 'string')
      opts.config = { url: args[0] }
      if hasData then opts.config.json = {} else opts.config.json = true
    # get(config) or delete(config) or post(config) or put(config) or head(config)
    else if signature.matches(args, 'object')
      opts.config = args[0]
      if opts.config.json is undefined then opts.config.json = true
    # post(url, json) or put(url, json)
    else if signature.matches(args, 'string', 'object') and hasData
      opts.config = { url: args[0], json: args[1] }
    else
      throw new Error "Invalid params: #{args.join(', ')}"
    # return parsed options
    return opts
