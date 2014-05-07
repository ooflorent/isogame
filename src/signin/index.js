var vue = require('vue');
var template = require('./index.html');
var Signin = vue(template);

Signin.on('created', function(view) {
  var el = view.el;
  var username = el.find('.username');
  var password = el.find('.password');

  el.find('a').on('click', function() {
    Signin.emit('signup');
  });

  el.on('submit', function(e) {
    e.preventDefault();
    if (el.checkValidity()) {
      Signin.emit('signin', username.value, password.value);
    }
  });
});

module.exports = Signin;
