var app = require('app');
var dom = require('lib/dom');

var el = dom('#signup');

var username = el.find('.username');
var password = el.find('.password');
var confirm = el.find('.confirm');

el.find('a').on('click', function() {
  app.state('signin');
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
    app.emit('signup', username.value, password.value);
  }
});

module.exports = function() {
  password.value = confirm.value = '';
};
