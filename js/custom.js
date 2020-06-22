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
  collapseHeader();
  $('#upper-content').empty();
  loadHTML('#lower-content', 'ajax/contract.html', function() {
    $('.lower-wrapper *:last').before("<h1>" + greetingFormular + "<br/>employee " + employeeNumber + "</h1>\n<p>Welcome to McDonald's " + country + ".</p>\n<p>Your McPay is " + salary + " per hour.<br/>Happy first McDay!</p>\n<p>Tap to sign</p>");
  });
  $('#lower-content').removeAttr('hidden');
}

function loadInfo() {
  if (isInfoLoaded == 0) {
    $('#lower-text').empty();
    loadHTML('#lower-text', 'ajax/texts.html #info-text');
    isInfoLoaded = 1;
  } else {
    $('#lower-text').empty();
    isInfoLoaded = 0;
  }
}

function loadPainting() {
  $('#upper-content').empty();
  loadHTML('#upper-content', 'ajax/texts.html #new-order-text');
  $('#lower-content').empty();
  $('#lower-content').removeAttr('hidden');
  $('#lower-content').load('ajax/canvas.html', ajaxError(), function() {
    $('#canvas').on('load', loadScript('js/painting.js'));
  });
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-patty');
}

function collapseHeader() {
  $('#logo-big').attr('id', 'logo-small');
  $('#slogan').attr('hidden', 'true');
  $('#info-icon').css('margin-top', '10px');
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