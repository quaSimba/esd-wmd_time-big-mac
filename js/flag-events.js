$("input.flag").on('click', function(event) {
  event.preventDefault();
  var flags = $("input.flag").toArray();
  var selectedFlag;
  /* Act on the event */
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
  for (var i = 0; i < flags.length; i++) {
    flags[i].remove();
  }

  // animation
  var zoomX = $('.background-image')[0].getBoundingClientRect().x + ($('.background-image')[0].getBoundingClientRect().width / 2) - selectedFlag[0].getBoundingClientRect().x;
  var zoomY = $('.background-image')[0].getBoundingClientRect().y + ($('.background-image')[0].getBoundingClientRect().height / 2) - selectedFlag[0].getBoundingClientRect().y;
  $('.background-image').animate({
    'left': zoomX - 30,
    'top': zoomY - 270
  }, '1s');
  $('.background-image').addClass('micro-view');

  loadContract();
});