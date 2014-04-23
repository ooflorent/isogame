/*globals http, emitter, http, vue*/

var app = {
  set state(value) {
    document.body.className = value;
  }
};

emitter(app);

vue('#signin', function() {
  this.model('.username', 'username');
  this.model('.password', 'password');

  this.event('a', 'click', function() { app.state = 'signup'; });
  this.event('&', 'submit', function(e) {
    e.preventDefault();
    if (this.el.checkValidity()) {
      http('/signin', this.data, function(err, token) {
        if (token) {
          app.emit('connect', token);
        } else {
          console.log(err);
        }
      });
    }
  });
});

vue('#signup', function() {
  this.model('.username', 'username');
  this.model('.password1', 'password');
  this.model('.password2', 'confirm');

  this.event('a', 'click', function() { app.state = 'signin'; });

  this.event('.username', 'input', function() {
    this.el.setCustomValidity(this.el.value.length < 4 ? 'Too short' : '');
  });

  this.event('.password1', 'input', function() {
    this.el.setCustomValidity(this.el.value.length < 6 ? 'Too short' : '');
  });

  this.event('.password2', 'input', function() {
    this.el.setCustomValidity(this.el.value !== this.data.password ? 'Invalid password' : '');
  });

  this.event('&', 'submit', function(e) {
    e.preventDefault();
    if (this.el.checkValidity()) {
      http('/signup', this.data, function(err, token) {
        if (token) {
          app.emit('connect', token);
        } else {
          console.log(err);
        }
      });
    }
  });
});
