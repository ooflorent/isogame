var config = require('./config');
var server = require('./server');
var socket = require('./socket')(server);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(config.server.port);
}
