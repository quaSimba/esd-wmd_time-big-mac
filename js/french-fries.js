var timeElapsed = 0;

function fryRandomiser() {
  var fries = [
    'resources/img/french-fry-01.svg',
    'resources/img/french-fry-02.svg',
    'resources/img/french-fry-03.svg'
  ];
  return fries[Math.floor(Math.random() * fries.length)];
}

function animateFry(fry, time) {
  var timeRemaining = time;
  var timeDisplay = fry.find('.time-field');
  fry.css('background-position', -fry.outerWidth());

  var interval = setInterval(function() {
    if (timeRemaining > 1000) {
      timeDisplay.html(msToTime(timeRemaining));
      timeRemaining -= 1000;
    } else {
      clearInterval(interval);
    }
  }, 1000);

  fry.animate({
    backgroundPosition: '0px'
  }, time, 'linear', function() {
    fry.find('.time-field').html("finished!");
  });
}

function fryFry(target, country) {
  $(target).css('background-image', 'url(' + fryRandomiser() + ')');
  $('#home-fry').find('.homeCountry.country-field').html(homeCountry.name);
  $('#home-fry').find('.time-field').html(msToTime(homeCountry.tpb));
  animateFry($('#home-fry'), homeCountry.tpb);
}