// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    //loadStart();
    //loadPainting();
    $('#lower-content').removeAttr('hidden');
    loadNiceTry();
  }
);

var country = "Mid world";
var greetingFormular = "Long days and pleasant nights";
var salary = "1€";
var employeeNumber = "1";
var tpb = 12000;
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
    $('#lower-content').removeAttr('hidden');
    $('#upper-content').attr('hidden', 'true');
    $('#lower-content').empty();
    loadHTML('#lower-content', 'ajax/info.html');
    isInfoLoaded = 1;
  } else {
    $('#lower-content').attr('hidden', 'true');
    $('#upper-content').removeAttr('hidden');
    $('#lower-content').empty();
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

function loadNiceTry() {
  $('#upper-content').empty();
  loadHTML('#lower-content', 'ajax/nice-try.html', function() {
    $('#cost').html("<p>One BigMac in " + country + " will cost you " + msToTime(tpb) + " hours of work. <br/>Better get to it</p>");
    loadScript("js/french-fries.js", function() {
      $('#home-fry').css('background-image', 'url(' + fryRandomiser() + ')');
      $('#home-fry').find('.country-display').html(country);
      $('#home-fry').find('.time-display').html(msToTime(tpb));
      animateFry($('#home-fry'), tpb);
    });
  });
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_middle-bun');
}

function loadCharts() {
  $('#upper-content').empty();
  loadHTML('#lower-content', 'ajax/chart.html', function() {

  });
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_bottom-bun');

}

function collapseHeader() {
  $('#logo-big').attr('id', 'logo-small');
  $('#slogan').attr('hidden', 'true');
  $('#info-icon').css('margin-top', '10px');
}

// helper functions:

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

// from https://coderwall.com/p/wkdefg/converting-milliseconds-to-hh-mm-ss-mmm
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}