const signature = require('./signature_checker')

module.exports = function (args, hasData = false) {
  let opts = {}

  // get(url) or delete(url) or post(url) or put(url) or head(url)
  if (signature.matches(args, 'string')) {
    opts.config = { url: args[0] }
    opts.config.json = hasData ? {} : true

  // get(config) or delete(config) or post(config) or put(config) or head(config)
  } else if (signature.matches(args, 'object')) {
    opts.config = args[0]
    if (opts.config.json == null && hasData) {
      opts.config.json = opts.config.body != null && typeof opts.config.body === 'object'
    }

  // post(url, json) or put(url, json)
  } else if (signature.matches(args, 'string', 'object') && hasData) {
    opts.config = { url: args[0], json: args[1] }

  // post(url, text) or put(url, text)
  } else if (signature.matches(args, 'string', 'string') && hasData) {
    opts.config = { url: args[0], body: args[1] }
  } else {
    throw new Error(`Invalid params: ${args.join(', ')}`)
  }

  // Default to gzip on
  opts.config.gzip = opts.config.gzip !== false

  return opts
}
