var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./auth');
var config = require('./config');

var app = module.exports = express();

app.use(bodyParser());
app.use(express.static(config.paths.client));

app.get('/session/:token', function(req, res) {
  auth.session(req.params.token, function(err, user) {
    if (err) {
      res.send(400);
    } else {
      res.json(user);
    }
  });
});

app.post('/signin', function(req, res) {
  auth.signin(req.body.username, req.body.password, function(err, token) {
    if (err) {
      res.send(400);
    } else {
      res.json(token);
    }
  });
});

app.post('/signout', function(req, res) {
  auth.signout(req.body.token, function(err) {
    if (err) {
      res.send(400);
    } else {
      res.send(200);
    }
  });
});

app.post('/signup', function(req, res) {
  auth.signup(req.body.username, req.body.password, function(err, token) {
    if (err) {
      res.send(400);
    } else {
      res.json(token);
    }
  });
});
