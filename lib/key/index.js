var emitter = require('emitter');
var events = require('event');

function key(code, fn) {
  key.on(code, fn);
  return function() {
    key.off(code, fn);
  };
}

emitter(key);

events.bind(document.body, 'keydown', function(e) {
  key.emit(e.which);
});

module.exports = key;
