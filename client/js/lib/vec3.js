module.exports = {
  add: function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  },
  sub: function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  },
  normalize: function(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = Math.sqrt(x * x + y * y + z * z);

    out[0] = x / len;
    out[1] = y / len;
    out[2] = z / len;
    return out;
  },
  dot: function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  cross: function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
};
