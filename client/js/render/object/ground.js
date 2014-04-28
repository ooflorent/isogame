var rand = require('lib/rand');
var brick = require('render/primitive/brick');

function ground(colors) {
  return function() {
    return brick(96, 96, rand.pick(colors));
  };
}

module.exports = {
  grass: ground(['#57AF47', '#559340', '#81A43C']),
  sand: ground(['#F4D59B', '#E4C287', '#E4B470']),
  rock: ground(['#5D5F6A', '#565760', '#6c6d79']),
  water: ground(['#38BCC8', '#31A5CA', '#2AAFB4'])
};
