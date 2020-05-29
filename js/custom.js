// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    loadWelcome();
  }
);

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

function loadWelcome() {
  $('#upper-text').load('ajax/texts.html #welcome-text', ajaxError());
  $('#burger-container').load('ajax/burger-background.html #burger', ajaxError());
}

function ajaxError(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    console.log(msg + xhr.status + " " + xhr.statusText);
  }
}