(function() {
  var ArgParser, Breq, RequestAdapter, request,
    __slice = [].slice;

  request = require("request");

  RequestAdapter = require("./request-adapter");

  ArgParser = require("./arg-parser");

  Breq = (function() {
    function Breq() {}

    request = function(method, args) {
      var opts;
      opts = ArgParser.parse(method, args);
      return RequestAdapter.makeRequest(opts.config, opts.callback);
    };

    Breq.get = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("get", args);
    };

    Breq.post = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("post", args);
    };

    Breq["delete"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("delete", args);
    };

    Breq.put = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("put", args);
    };

    return Breq;

  })();

  module.exports = Breq;

}).call(this);
