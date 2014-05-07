var vue = require('vue');
var template = require('./index.html');
var Game = vue(template);

Game.on('created', function(view) {
  var el = view.el;
  var canvas = el.find('.iso');

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  console.log(view.data);
});

module.exports = Game;
