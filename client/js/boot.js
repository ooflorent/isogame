var app = require('app');
var http = require('lib/http');

function connect() {}

function tryConnect(err, token) {
  if (token) {
    connect(token);
  } else {
    app.error(err.responseText);
  }
}

app.on('signin', function(username, password) {
  console.log('signin', username, password);
  http('/signin', {
    username: username,
    password: password
  }, tryConnect);
});

app.on('signup', function(username, password) {
  console.log('signup', username, password);
  http('/signup', {
    username: username,
    password: password
  }, tryConnect);
});

window.onload = function() {
  app.state('game');
};
