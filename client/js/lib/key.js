var emitter = require('lib/emitter');
var events = require('lib/event');

function key(code, fn) {
  key.on(code, fn);
}

emitter(key);

events.bind(document.body, 'keydown', function(e) {
  key.emit(e.which);
});

module.exports = key;
