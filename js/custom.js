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
var tpb;
var isInfoLoaded = 0;

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
  loadHTML('#upper-content', 'ajax/texts.html #welcome-text');
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags');
  loadScript("js/flag-events.js");
}

function loadWelcome() {
  $('#welcome-text').empty();
  $('#lower-panel').html("<div class\=\"contract\"><h1>" + greetingFormular +  "<br/>employee " + employeeNumber + "</h1>\n<p>Welcome to McDonald's " + country +".</p>\n<p>Your McPay is " + salary + " per hour.<br/>Happy first McDay!</p>\n<p>Tap to sign</p><div>");
}


function loadInfo() {
    if (isInfoLoaded == 0) {
    $('#lower-text').empty();
    loadHTML('#lower-text', 'ajax/info.html');
    isInfoLoaded = 1;
  } else {
    $('#lower-text').empty();
    isInfoLoaded = 0;
  }
}

function loadPainting() {
  $('#lower-content').empty();
  $('#lower-content').removeAttr('hidden');
  $('#lower-content').load('ajax/canvas.html', ajaxError(), function() {
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