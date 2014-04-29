var lighten = require('lib/lighten');
var vec3 = require('lib/vec3');
var Canvas = require('render/canvas');

function Isogon(el) {
  this.canvas = new Canvas(el);
  this.angle = Math.PI / 6;
  this.scale = 35;
  this.x = el.width / 2;
  this.y = el.height / 2;
  this.pov([2, -1, 3]);
}

Isogon.prototype = {
  add: function(paths, color) {
    for (var i = 0; i < paths.length; i++) {
      this.path(paths[i], color);
    }
  },
  path: function(points, color) {
    var light = [];
    vec3.cross(light, vec3.sub([], points[1], points[2]), vec3.sub([], points[0], points[1]));
    vec3.normalize(light, light);

    var brightness = vec3.dot(light, this.light) * .2;
    this.canvas.path(points.map(this.projection, this), lighten(color, brightness));
  },
  projection: function(point) {
    var angle = this.angle;
    var scale = this.scale;

    var x1 = point[0] * scale * Math.cos(angle);
    var y1 = point[0] * scale * Math.sin(angle);

    var x2 = point[1] * scale * Math.cos(Math.PI - angle);
    var y2 = point[1] * scale * Math.sin(Math.PI - angle);

    return [
      this.x + x1 + x2,
      this.y - y1 - y2 - (point[2] * scale)
    ];
  },
  pov: function(vec) {
    this.light = vec3.normalize([], vec);
  }
};

module.exports = Isogon;
