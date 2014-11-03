(function() {
  var Promise, RequestAdapter, request;

  request = require("request");

  Promise = require("bluebird");

  Promise.prototype.fail = Promise.prototype.caught;

  RequestAdapter = (function() {
    function RequestAdapter() {}

    RequestAdapter.prototype.makeRequest = function(config, callback) {
      var deferred;
      deferred = Promise.defer();
      request(config, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(res);
        }
        if (callback) {
          return callback(err, res);
        }
      });
      return deferred.promise;
    };

    return RequestAdapter;

  })();

  module.exports = new RequestAdapter();

}).call(this);
