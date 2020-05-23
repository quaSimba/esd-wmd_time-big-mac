// kick-starting fullpage
$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling: false,
    scrollHorizontally: false,
    verticalCentered: false
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);
});