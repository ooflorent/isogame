function Canvas(el) {
  this.el = el;
  this.ctx = el.getContext('2d');
}

Canvas.prototype = {
  clear: function() {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
  },
  path: function(points, color) {
    var ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();
  }
};

module.exports = Canvas;
