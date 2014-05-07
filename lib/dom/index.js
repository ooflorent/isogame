var events = require('event');

module.exports = function dom(el, ctx) {
  if (typeof el === 'string') {
    el = (ctx || document).querySelector(el);
  }

  el.on = function(event, fn, capture) {
    events.bind(el, event, fn, capture);
    return el;
  };

  el.off = function(event, fn, capture) {
    events.unbind(el, event, fn, capture);
    return el;
  };

  el.find = function(selector) {
    var children = [].slice.call(el.querySelectorAll(selector)).map(function(child) {
      return dom(child);
    });

    return children.length > 1 ? children : children[0];
  };

  return el;
};
