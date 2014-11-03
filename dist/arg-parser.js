(function() {
  var ArgParser, signature;

  signature = require("./signature-checker");

  ArgParser = (function() {
    function ArgParser() {}

    ArgParser.prototype.parse = function(method, args) {
      var opts;
      opts = {};
      method = method.toUpperCase();
      switch (method) {
        case "GET":
        case "DELETE":
          opts = this.getOpts(args, false);
          break;
        case "POST":
        case "PUT":
          opts = this.getOpts(args, true);
          break;
        default:
          throw new Error("Method must be GET, DELETE, POST or PUT");
      }
      opts.config.method = method;
      return opts;
    };

    ArgParser.prototype.getOpts = function(args, hasData) {
      var opts;
      if (hasData == null) {
        hasData = false;
      }
      opts = {};
      if (signature.matches(args, "object", "function")) {
        opts.config = args[0];
        opts.callback = args[1];
        if (opts.config.json === void 0) {
          opts.config.json = true;
        }
      } else if (signature.matches(args, "string", "function")) {
        opts.config = {
          url: args[0]
        };
        opts.callback = args[1];
        if (hasData) {
          opts.config.json = {};
        } else {
          opts.config.json = true;
        }
      } else if (signature.matches(args, "string", "object", "function") && hasData) {
        opts.config = {
          url: args[0],
          json: args[1]
        };
        opts.callback = args[2];
      } else if (signature.matches(args, "string")) {
        opts.config = {
          url: args[0]
        };
        if (hasData) {
          opts.config.json = {};
        } else {
          opts.config.json = true;
        }
      } else if (signature.matches(args, "object")) {
        opts.config = args[0];
        if (opts.config.json === void 0) {
          opts.config.json = true;
        }
      } else if (signature.matches(args, "string", "object") && hasData) {
        opts.config = {
          url: args[0],
          json: args[1]
        };
      } else {
        throw new Error("Invalid params: " + (args.join(', ')));
      }
      return opts;
    };

    return ArgParser;

  })();

  module.exports = new ArgParser();

}).call(this);
