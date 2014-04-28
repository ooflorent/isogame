module.exports = function(target) {
  var callbacks = {};
  var obj = target || {};

  obj.on = function(event, fn) {
    (callbacks[event] = callbacks[event] || []).push(fn);
    return obj;
  };

  obj.once = function(event, fn) {
    function on() {
      obj.off(event, on);
      fn.apply(obj, arguments);
    }

    on.fn = fn;
    obj.on(event, on);
    return obj;
  };

  obj.off = function(event, fn) {
    var argc = arguments.length;
    if (argc === 0) {
      callbacks = {};
    } else if (argc === 1) {
      delete callbacks[event];
    } else {
      var list = callbacks[event];
      if (list) {
        for (var i = 0, n = list.length; i < n; i++) {
          var cb = list[i];
          if (cb === fn || cb.fn === fn) {
            list.splice(i, 1);
            break;
          }
        }
      }
    }

    return obj;
  };

  obj.emit = function(event) {
    var args = [].slice.call(arguments, 1);
    var list = callbacks[event];
    if (list) {
      list = list.slice(0);
      for (var i = 0, n = list.length; i < n; i++) {
        list[i].apply(obj, args);
      }
    }

    return obj;
  };

  return obj;
};
