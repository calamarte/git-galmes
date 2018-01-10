var page = require('webpage').create();
var system = require('system');

var palabra = system.args[1];
page.open('http://www.wordreference.com/es/', function(status) {
  console.log("Status: " + status);

  if(status === "success") {
    page.evaluate(function (palabra) {

      document.querySelector('#si').value = palabra;
      var e = document.createEvent('HTMLEvents');
      e.initEvent('keyup', false, true);
      document.querySelector('#si').dispatchEvent(e);

    }, palabra);
  }

	setTimeout(function () {
    page.render('tal.png');
    phantom.exit();
  },500);
});


