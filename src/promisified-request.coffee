request = require 'request'
Promise = require 'bluebird'

module.exports = (config) ->
  new Promise (resolve, reject)->
    request config, (err, res) ->
      if err? then reject err
      else resolve res
