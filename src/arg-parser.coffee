getOpts = require './get-options'

module.exports = (method, args) ->
  opts = {}
  method = method.toUpperCase()
  switch method
    when 'GET', 'DELETE', 'HEAD' then opts = getOpts(args, false)
    when 'POST',  'PUT' then opts = getOpts(args, true)
    else throw new Error 'Method must be GET, DELETE, POST, PUT or HEAD'
  opts.config.method = method
  return opts
