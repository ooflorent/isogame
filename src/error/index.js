var key = require('key');
var vue = require('vue');
var template = require('./index.html');
var Error = vue(template);

Error.on('created', function(view) {
  var unbind;
  var close = function() {
    view.remove();
    unbind();
  };

  // Close when Esc is pressed
  unbind = key(27, close);

  // Close when the button is clicked
  view.el.find('button').on('click', close);

  // Show error message
  view.el.find('.msg').textContent = view.data;
});

module.exports = Error;
