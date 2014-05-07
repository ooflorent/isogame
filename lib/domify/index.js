var dom = require('dom');

module.exports = function(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  el = el.removeChild(el.firstChild);

  return dom(el);
};
