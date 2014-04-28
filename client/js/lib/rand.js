function rand(max) {
  return Math.random() * max | 0;
}

rand.pick = function(array) {
  return array[rand(array.length)];
};

module.exports = rand;
