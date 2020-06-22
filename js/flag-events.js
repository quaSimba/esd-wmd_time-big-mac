$("input.flag").on('click', function(event) {
  event.preventDefault();
  /* Act on the event */
  switch (event.target.id) {
    case 'flag-US':
      country = 'America';
      greetingFormular = 'Hey';
      salary = '9.03';
      employeeNumber = '#210,001';
      tpb = '00:36:61';
      break;
    case 'flag-ME':
      country = 'Mexico';
      greetingFormular = 'Hola';
      salary = '1';
      employeeNumber = '#11,501';
      tpb = '02:28:00';
      break;
    case 'flag-IT':
      country = 'Italy';
      greetingFormular = 'Ciao';
      salary = '9.2';
      employeeNumber = '#3,045';
      tpb = '00:30:65';
      break;
    case 'flag-ZA':
      country = 'South Africa';
      greetingFormular = 'Hallo';
      salary = '0.97';
      employeeNumber = '#10,001';
      tpb = '03:17:94';
      break;
    case 'flag-IN':
      country = 'India';
      greetingFormular = 'Namaste';
      salary = '0.66';
      employeeNumber = '#4,001';
      tpb = '03:35:45';
      break;
    case 'flag-AU':
      country = 'Australia';
      greetingFormular = 'G׳day';
      salary = '13.4';
      employeeNumber = '#90,001';
      tpb = '00:17:46';
      break;
    default:
      country = 'Mid World';
      break;
  }
  loadWelcome();
});