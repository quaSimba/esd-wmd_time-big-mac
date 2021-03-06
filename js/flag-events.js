// Assigning an EventListener to the flags
$("input.flag").on('click', function(event) {
  event.preventDefault();
  var flags = $("input.flag").toArray();
  var selectedFlag;

  // Act on the event according to user's choice
  switch (event.target.id) {
    case 'flag-AU':
      homeCountry = countries.AU;
      selectedFlag = flags.splice(5, 1);
      break;
    case 'flag-IN':
      homeCountry = countries.IN;
      selectedFlag = flags.splice(4, 1);
      break;
    case 'flag-IT':
      homeCountry = countries.IT;
      selectedFlag = flags.splice(2, 1);
      break;
    case 'flag-ME':
      homeCountry = countries.ME;
      selectedFlag = flags.splice(1, 1);
      break;
    case 'flag-US':
      homeCountry = countries.US;
      selectedFlag = flags.splice(0, 1);
      break;
    case 'flag-ZA':
      homeCountry = countries.ZA;
      selectedFlag = flags.splice(3, 1);
      break;
    default:
      break;
  }

  // Animate the flags to disappear
  flags.forEach(function(flag) {
    $(flag).animate({
      top: '-600px'
    }, 700);
  });

  // Disable the EventListener of the selected flag
  $(selectedFlag).off();

  // Zoom animation
  var zoomX = $('.background-image')[0].getBoundingClientRect().x + ($('.background-image')[0].getBoundingClientRect().width / 2) - selectedFlag[0].getBoundingClientRect().x;
  var zoomY = $('.background-image')[0].getBoundingClientRect().y + ($('.background-image')[0].getBoundingClientRect().height / 2) - selectedFlag[0].getBoundingClientRect().y;

  $('#burger-flags').animate({
    'left': zoomX - 30,
    'top': zoomY - 270
  }, '1s');
  $('#burger-flags').addClass('micro-view');

  // Load the next Page
  loadContract();
});