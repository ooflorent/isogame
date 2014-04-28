var rect = require('render/shape/rect');

module.exports = function(origin, dx, dy, dz) {
  return rect(origin, dx, dy, dz).concat([
    [
      [origin[0], origin[1], origin[2]],
      [origin[0], origin[1], origin[2] + dz],
      [origin[0], origin[1] + dy, origin[2] + dz],
      [origin[0], origin[1] + dy, origin[2]]
    ],
    [
      [origin[0], origin[1], origin[2] + dz],
      [origin[0], origin[1] , origin[2]],
      [origin[0] + dx, origin[1], origin[2]],
      [origin[0] + dx, origin[1], origin[2] + dz]
    ]
  ]);
};
