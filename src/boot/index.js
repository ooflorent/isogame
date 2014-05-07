var Game = require('game');
var Heroes = require('heroes');
var Signin = require('signin');
var Signup = require('signup');

var view;
var views = {
  game: Game,
  heroes: Heroes,
  signin: Signin,
  signup: Signup
};

function setView(name, data) {
  if (view) view.remove();

  var View = views[name];
  view = new View(data || {});
  view.appendTo(document.body);
}

Signin.on('signup', function() { setView('signup'); });
Signin.on('signin', function(username, password) {
  console.log('signin', username, password);
  request('POST', '/signin', {
    username: username,
    password: password
  }, connect);
});

Signup.on('signin', function() { setView('signin'); });
Signup.on('signup', function(username, password) {
  console.log('signup', username, password);
  request('POST', '/signup', {
    username: username,
    password: password
  }, connect);
});

setView('signin');

function Connection() {}
function connect(err, token) {
  if (token) {
    var conn = new Connection(token);
  } else {
    console.log(err.responseText);
    // app.error(err.responseText);
  }
}
