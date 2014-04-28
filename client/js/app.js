var emitter = require('lib/emitter');

var app = module.exports = {
  state: function(state, data) {
    document.body.className = state;
    if (states[state]) {
      states[state].call(null, data);
    }
  },
  error: function(err) {
    errorDialog(err);
  }
};

var errorDialog = require('ui/error');
var states = {
  signin: require('ui/signin'),
  signup: require('ui/signup'),
  heroes: require('ui/heroes'),
  game: require('ui/game')
};

emitter(app);
