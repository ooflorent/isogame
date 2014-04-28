var fs = require('fs');
var path = require('path');
var through = require('through2');

var browser = new Buffer(fs.readFileSync(__dirname + '/browser.js'));

function gulpRequirer() {}

gulpRequirer.compile = function(options) {
  var base = path.resolve(options.base);
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) return;
    if (file.isStream()) return;

    var resolved = path.relative(base, file.path).slice(0, -3);
    var prefix = new Buffer('_modules["' + resolved + '"] = function(require, module) {\n');
    var suffix = new Buffer('};');

    file.contents = Buffer.concat([prefix, file.contents, suffix]);
    this.push(file);

    return callback();
  });
};

gulpRequirer.boot = function(options) {
  var prefix = new Buffer(';(function(window, document) {\n');
  var suffix = new Buffer('})(window, document)');

  return through.obj(function(file, enc, callback) {
    if (file.isNull()) return;
    if (file.isStream()) return;

    var bootstrap = new Buffer('_require("' + options.module + '");');

    file.contents = Buffer.concat([prefix, browser, file.contents, bootstrap, suffix]);
    this.push(file);

    return callback();
  });
};

gulpRequirer.compress = function() {
  var modulePattern = /_modules\[["']([^"']+)["']\]/g;
  var requirePattern = /require\(["']([^"']+)["']\)/g;

  return through.obj(function(file, enc, callback) {
    if (file.isNull()) return;
    if (file.isStream()) return;

    var modules = {};
    var contents = file.contents.toString();
    var index = 0;
    var res;

    while (res = modulePattern.exec(contents)) {
      modules[res[1]] = index++;
    }

    contents = contents.replace(modulePattern, function(s, module) {
      return '_modules[' + modules[module] + ']';
    });

    contents = contents.replace(requirePattern, function(s, module) {
      return 'require(' + modules[module] + ')';
    });

    file.contents = new Buffer(contents);
    this.push(file);

    return callback();
  });
};

module.exports = gulpRequirer;
