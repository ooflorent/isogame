function Request(method, url) {
  this.headers = {};
  this.method = method;
  this.url = url;
}

Request.prototype.header = function(header, value) {
  this.headers[header] = value;
  return this;
}

Request.prototype.send = function(data) {
  if (data) {
    this.data = JSON.stringify(data);
    this.headers['Content-Type'] = 'application/json';
  }
  return this;
};

Request.prototype.end = function(done) {
  if (arguments.length === 1) {
    done = data;
    data = undefined;
  }

  var xhr = new XMLHttpRequest();

  xhr.onerror = function() {
    done(xhr);
  };

  xhr.onload = function() {
    if (xhr.status === 200) {
      done(null, JSON.parse(xhr.response));
    } else {
      done(xhr);
    }
  };

  xhr.open(this.method, this.url, true);

  for (var header in this.headers) {
    xhr.setRequestHeader(header, this.headers[header]);
  }

  xhr.send(this.data);
  return this;
};

function request(method, url) {
  return new Request(method, url);
}

request.get = function(url, done) {
  return request('GET', url).end(done);
};

request.post = function(url, data, done) {
  return request('POST', url).send(data).end(done);
};

module.exports = request;
