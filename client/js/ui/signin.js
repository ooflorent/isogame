var app = require('app');
var dom = require('lib/dom');

var el = dom('#signin');

var username = el.find('.username');
var password = el.find('.password');

el.find('a').on('click', function() {
  app.state('signup');
});

el.on('submit', function(e) {
  e.preventDefault();
  if (el.checkValidity()) {
    app.emit('signin', username.value, password.value);
  }
});

module.exports = function() {
  password.value = '';
};
