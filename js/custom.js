// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    loadStart();
    // loadPainting();
  }
);

var country;

function initFullpage() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling: false,
    scrollHorizontally: false,
    verticalCentered: false,
    responsiveWidth: 0,
    responsiveHeight: 0,
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
}

function loadStart() {
<<<<<<< HEAD
  loadHTML('#upper-content', 'ajax/texts.html #welcome-text');
=======
  loadHTML('#upper-text', 'ajax/texts.html #welcome-text');
>>>>>>> 63b77382ea4b12146f7e1d12a57c97a796a6fe5e
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags');
  loadScript("js/flag-events.js");
}

function loadWelcome() {
  $('#upper-content').empty();
  $('#lower-panel').html("Welcome to McDonald's " + country);
}

function loadPainting() {
<<<<<<< HEAD
  $('#lower-content').load('ajax/canvas.html', ajaxError(), function() {
=======
  $('#lower-text').load('ajax/canvas.html', ajaxError(), function() {
>>>>>>> 63b77382ea4b12146f7e1d12a57c97a796a6fe5e
    $('#canvas').on('load', loadScript('js/painting.js'));
  });
}

// method to load external scripts
function loadScript(url, callback) {
  $.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
}

function loadHTML(target, source, callback) {
  $(target).load(source, ajaxError(), callback);
}

function ajaxError(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    console.log(msg + xhr.status + " " + xhr.statusText);
  }
}