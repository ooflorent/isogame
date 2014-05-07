var vue = require('vue');
var template = require('./index.html');
var Heroes = vue(template);

Heroes.on('created', function(view) {
  console.log(view.data);
});

module.exports = Heroes;
