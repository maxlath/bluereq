(function() {
  var ArgParser, Bluereq, RequestAdapter, request,
    __slice = [].slice;

  request = require("request");

  RequestAdapter = require("./request-adapter");

  ArgParser = require("./arg-parser");

  Bluereq = (function() {
    function Bluereq() {}

    request = function(method, args) {
      var opts;
      opts = ArgParser.parse(method, args);
      return RequestAdapter.makeRequest(opts.config, opts.callback);
    };

    Bluereq.get = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("get", args);
    };

    Bluereq.post = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("post", args);
    };

    Bluereq["delete"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("delete", args);
    };

    Bluereq.put = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return request("put", args);
    };

    return Bluereq;

  })();

  module.exports = Bluereq;

}).call(this);
