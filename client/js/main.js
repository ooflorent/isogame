/*globals app*/
window.onload = function() {
  app.state = 'signin';

  app.on('connect', function(token) {
    console.log(token);
  });
};
