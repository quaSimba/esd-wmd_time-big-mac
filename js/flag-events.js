$("input.flag").on('click', function(event) {
  event.preventDefault();
  var flags = $("input.flag").toArray();
  var selectedFlag;
  /* Act on the event */
  switch (event.target.id) {
    case 'flag-US':
      country = 'America';
      greetingFormular = 'Hey';
      salary = '9.03';
      employeeNumber = '#210,001';
      tpb = '00:36:61';
      selectedFlag = flags.splice(0, 1);
      break;
    case 'flag-ME':
      country = 'Mexico';
      greetingFormular = 'Hola';
      salary = '1';
      employeeNumber = '#11,501';
      tpb = '02:28:00';
      selectedFlag = flags.splice(1, 1);
      break;
    case 'flag-IT':
      country = 'Italy';
      greetingFormular = 'Ciao';
      salary = '9.2';
      employeeNumber = '#3,045';
      tpb = '00:30:65';
      selectedFlag = flags.splice(2, 1);
      break;
    case 'flag-ZA':
      country = 'South Africa';
      greetingFormular = 'Hallo';
      salary = '0.97';
      employeeNumber = '#10,001';
      tpb = '03:17:94';
      selectedFlag = flags.splice(3, 1);
      break;
    case 'flag-IN':
      country = 'India';
      greetingFormular = 'Namaste';
      salary = '0.66';
      employeeNumber = '#4,001';
      tpb = '03:35:45';
      selectedFlag = flags.splice(4, 1);
      break;
    case 'flag-AU':
      country = 'Australia';
      greetingFormular = 'G׳day';
      salary = '13.4';
      employeeNumber = '#90,001';
      tpb = '00:17:46';
      selectedFlag = flags.splice(5, 1);
      break;
    default:
      country = 'Mid World';
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

  loadWelcome();
});