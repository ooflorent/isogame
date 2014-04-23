var WebSocketServer = require('ws').Server;

module.exports = function(server) {
  var wss = new WebSocketServer({server: server});

  wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      console.log('received: %s', message);
    });

    ws.send('something');
  });

  return wss;
};
