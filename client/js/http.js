function http(url, data, done) {
  var xhr = new XMLHttpRequest();
  if (done) {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    data = JSON.stringify(data);
  } else {
    xhr.open('GET', url, true);
    done = data;
    data = undefined;
  }

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

  xhr.send(data);
}
