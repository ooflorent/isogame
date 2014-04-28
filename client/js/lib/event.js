module.exports = {
  bind: function(el, event, fn, capture) {
    el.addEventListener(event, fn, !!capture);
  },
  unbind: function(el, event, fn, capture) {
    el.removeEventListener(event, fn, !!capture);
  }
};
