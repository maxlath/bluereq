request = require "request"
Promise = require "bluebird"

# adding a fail alias to caught to ease
# the transition from Q to Bluebird
Promise::fail = Promise::caught

class RequestAdapter

  makeRequest: (config, callback) ->
    # init defer object
    deferred = Promise.defer()
    # make request
    request config, (err, res) ->
      if err then deferred.reject(err)
      else deferred.resolve(res)
      callback err, res if callback
    # return promise
    deferred.promise

module.exports = new RequestAdapter()