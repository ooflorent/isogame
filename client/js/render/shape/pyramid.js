module.exports = function(origin, dx, dy, dz) {
  return [
    [
      [origin[0], origin[1], origin[2]],
      [origin[0] + dx, origin[1], origin[2]],
      [origin[0] + dx / 2, origin[1] + dy / 2, origin[2] + dz]
    ],
    [
      [origin[0], origin[1], origin[2]],
      [origin[0] + dx / 2, origin[1] + dy / 2, origin[2] + dz],
      [origin[0], origin[1] + dy, origin[2]]
    ]
  ];
};
