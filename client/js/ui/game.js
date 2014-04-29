var dom = require('lib/dom');
var IsoEngine = require('render/iso');
var cube = require('render/shape/cube');

var el = dom('#game');
var canvas = el.find('.iso');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var iso = new Isogon(canvas);

iso.add(cube([0, 0, 0], 2, 2, 2), '#666666');


iso.add(cube([1, 0, 0], 4, 4, 2), '#666666');
iso.add(cube([0, 0, 0], 1, 4, 1), '#666666');
iso.add(cube([-1, 1, 0], 1, 3, 1), '#666666');
iso.add(cube([3, 0, 2], 2, 4, 1), '#666666');
iso.add(cube([2, 1, 2], 1, 3, 1), '#666666');

module.exports = function() {
};
