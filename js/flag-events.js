$("input.flag").on('click', function(event) {
  event.preventDefault();
  /* Act on the event */
  switch (event.target.id) {
    case 'flag-US':
      country = 'America';
      break;
    case 'flag-ME':
      country = 'Mexico';
      break;
    case 'flag-IT':
      country = 'Italy';
      break;
    case 'flag-ZA':
      country = 'South Africa';
      break;
    case 'flag-IN':
      country = 'India';
      break;
    case 'flag-AU':
      country = 'Australia';
      break;
    default:
      country = 'Mid World';
      break;
  }
  loadWelcome();
});