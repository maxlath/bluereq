request = require "request"
Promise = require "bluebird"

# adding a fail alias to caught to ease
# the transition from Q to Bluebird
Promise::fail = Promise::caught

module.exports =
  makeRequest: (config, callback) ->
    new Promise (resolve, reject)->
      request config, (err, res) ->
        if err? then reject err
        else resolve res
        callback err, res if callback