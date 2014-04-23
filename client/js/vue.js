function vue(id, def) {
  def.el = document.querySelector(id);
  def.data = {};

  def.event = function(selector, event, fn) {
    var el = selector === '&' ? def.el : def.el.querySelector(selector);
    el['on' + event] = function(e) {
      fn.call({
        data: def.data,
        el: el
      }, e);
    };
  };

  def.model = function(selector, key) {
    def.event(selector, 'change', function() {
      def.data[key] = this.el.value;
    });
  };

  def.call(def);
}
