var domify = require('domify');
var emitter = require('emitter');

function createView(template) {
  function View(data) {
    this.el = domify(template);
    this.data = data;
    View.emit('created', this);
  }

  emitter(View);
  emitter(View.prototype);

  View.prototype.appendTo = function(node) {
    node.appendChild(this.el);
    this.emit('added');
    View.emit('added', this);
  };

  View.prototype.remove = function() {
    this.el.parentNode.removeChild(this.el);
    this.emit('removed');
    View.emit('removed', this);
  };

  return View;
}

module.exports = createView;
