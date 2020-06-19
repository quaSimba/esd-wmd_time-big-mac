// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    loadStart();
      //loadPainting();
  }
);

var country;
var greetingFormular;
var salary;
var employeeNumber;

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
}

function loadStart() {
  /*$('#lower-panel').load('ajax/canvas.html', ajaxError(), function() {
    $('#canvas').on('load', loadScript('js/painting.js'));
  });*/
  loadHTML('#upper-text', 'ajax/texts.html #welcome-text');
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags');
  loadScript("js/flag-events.js");
}

function loadWelcome() {
  $('#upper-text').empty();
  $('#lower-panel').html("<h1>Welcome to McDonald's " + country + greetingFormular + "</h1>");
}

function loadInfo() {
  $('#lower-text').empty();
  loadHTML('#lower-text', 'ajax/texts.html #info-text');
}

function loadPainting(){
  $('#lower-text').empty();
  $('#lower-panel').load('ajax/canvas.html', ajaxError(), function() {
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