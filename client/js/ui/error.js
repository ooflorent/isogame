var dom = require('lib/dom');
var key = require('lib/key');

var el = dom('#error');
var msg = el.find('.msg');

function show(err) {
  msg.textContent = err;
  document.body.appendChild(el);
}

function hide() {
  el.remove();
}

hide();

// Hide when the button is clicked
el.find('button').on('click', hide);

// Hide when Esc is pressed
key(27, hide);

module.exports = show;
