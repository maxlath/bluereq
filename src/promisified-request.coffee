request = require 'request'
Promise = require 'bluebird'

module.exports = (config) ->
  new Promise (resolve, reject)->
    request config, (err, res) ->
      if err? then reject err
      else
        if res.statusCode < 400 then resolve res
        else
          err = new Error res.statusMessage
          # copy all the data from res to err
          Object.assign(err, res)
          reject err
