var users = {};
var loginToToken = {};
var tokenToLogin = {};

function authenticate(login, done) {
  var token = '';
  for (var i = 0; i < 32; i++) {
    token += (Math.random() * 16 | 0).toString(16);
  }

  loginToToken[login] = token;
  tokenToLogin[token] = login;
  done(null, token);
}

module.exports = {
  session: function(token, done) {
    var login = tokenToLogin[token];
    if (login) {
      done(null, users[login]);
    } else {
      done(new Error('Invalid token'));
    }
  },
  signin: function(username, password, done) {
    var login = username.toLowerCase();
    if (users[login]) {
      var user = users[login];
      if (user.password !== password) {
        done(new Error('Invalid password'));
      } else {
        authenticate(login, done);
      }
    } else {
      done(new Error('User does not exist'));
    }
  },
  signout: function(token, done) {
    var login = tokenToLogin[token];
    if (login) {
      delete loginToToken[login];
      delete tokenToLogin[token];
      done();
    } else {
      done(null, new Error('Invalid token'));
    }
  },
  signup: function(username, password, done) {
    if (username.length < 4) {
      return done(new Error('Username is too short'));
    }

    if (password.length < 6) {
      return done(new Error('Password is too short'));
    }

    var login = username.toLowerCase();
    if (users[login]) {
      return done(new Error('Username already exists'));
    }

    users[login] = {
      username: username,
      password: password
    };

    authenticate(login, done);
  }
};

users['florent'] = {
  username: 'Florent',
  password: 'florent'
};
