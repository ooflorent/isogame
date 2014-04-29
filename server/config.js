var path = require('path');

module.exports = {
  server: {
    port: 3000
  },
  paths: {
    client: path.join(__dirname, '/../dist/'),
    maps: path.join(__dirname, '/../dist/maps/')
  }
};
