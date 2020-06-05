// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    loadStart();
  }
);

var country;

function initFullpage() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling: false,
    scrollHorizontally: false,
    verticalCentered: false
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);
}

function loadStart() {
  loadHTML('#upper-text', 'ajax/texts.html #welcome-text');
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags');
  loadScript("js/flag-events.js");
}

function loadWelcome() {
  $('#upper-text').empty();
  $('#lower-panel').html("Welcome to McDonald's " + country);
}

// method to load external scripts
function loadScript(url, callback) {
  jQuery.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
}

function loadHTML(target, source, callback) {
  $(target).load(source, ajaxError());
}

function ajaxError(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    console.log(msg + xhr.status + " " + xhr.statusText);
  }
}