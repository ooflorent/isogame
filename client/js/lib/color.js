module.exports = {
  lighten: function(color, amount) {
    return '#' + color.slice(1).replace(/../g, function (c) {
      c = parseInt(c, 16);
      c = '0' + Math.round(Math.min(Math.max(0, c + (c * amount)), 255)).toString(16);
      return c.slice(-2);
    });
  },
  darken: function(color, amount) {
    return this.lighten(color, -amount);
  }
};
