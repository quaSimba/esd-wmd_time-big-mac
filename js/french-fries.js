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
  var timeDisplay = fry.find('.time-display');
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
    fry.find('.time-display').html("finished!");
  });
}