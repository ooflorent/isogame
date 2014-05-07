var request = require('request');

module.exports = {
  signin: function(username, password) {
    request.post('/signin', {
      username: username,
      password: password
    }, tryConnect);
  },
  signup: function(username, password) {
    request.post('/signup', {
      username: username,
      password: password
    }, tryConnect);
  }
};

function connect() {}

function tryConnect(err, token) {
  if (token) {
    connect(token);
  } else {
    app.error(err.responseText);
  }
}

