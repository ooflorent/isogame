var _modules = {};

function _require(path) {
  var module = _modules[path];
  if (!module.lock && !module.exports) {
    module.lock = true;
    module.call(null, _require, module);
    delete module.lock;
  }

  return module.exports;
}
