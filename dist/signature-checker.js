(function() {
  var SignatureChecker,
    __slice = [].slice;

  SignatureChecker = (function() {
    function SignatureChecker() {}

    SignatureChecker.prototype.matches = function() {
      var args, i, sig, signature, _i, _len;
      args = arguments[0], signature = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (args.length !== signature.length) {
        return false;
      }
      for (i = _i = 0, _len = signature.length; _i < _len; i = ++_i) {
        sig = signature[i];
        if (typeof args[i] !== sig) {
          return false;
        }
      }
      return true;
    };

    return SignatureChecker;

  })();

  module.exports = new SignatureChecker();

}).call(this);
