var vue = require('vue');
var template = require('./index.html');
var Signup = vue(template);

Signup.on('created', function(view) {
  var el = view.el;
  var username = el.find('.username');
  var password = el.find('.password');
  var confirm = el.find('.confirm');

  el.find('a').on('click', function() {
    Signup.emit('signin');
  });

  username.on('input', function() {
    username.setCustomValidity(username.value.length < 4 ? 'Too short' : '');
  });

  password.on('input', function() {
    password.setCustomValidity(password.value.length < 6 ? 'Too short' : '');
    confirm.value = '';
  });

  confirm.on('input', function() {
    confirm.setCustomValidity(confirm.value !== password.value ? 'Passwords mismatch' : '');
  });

  el.on('submit', function(e) {
    e.preventDefault();
    if (el.checkValidity()) {
      Signup.emit('signup', username.value, password.value);
    }
  });
});

module.exports = Signup;
