var timeElapsed = 0;
var fries = [];

function fryRandomiser() {
  var fryImages = [
    'resources/img/french-fry-01.svg',
    'resources/img/french-fry-02.svg',
    'resources/img/french-fry-03.svg'
  ];
  return fryImages[Math.floor(Math.random() * fryImages.length)];
}

function animateFry(fry, accelerationFactor, delta) {
  var helperFry = fries[fry.attr('id')];
  clearInterval(helperFry.intervalID);
  var tpbField = fry.find('.tpb-field');
  var lastStep = new Date();

  helperFry.intervalID = setInterval(function() {
    if (helperFry.timeRemaining > 1000) {
      helperFry.timeRemaining -= (new Date() - lastStep) * accelerationFactor;
      lastStep = new Date();
      tpbField.html(msToTime(Math.ceil(helperFry.timeRemaining / 1000) * 1000));
    } else {
      tpbField.html('finished!');
      clearInterval(helperFry.intervalID);
    }
  }, 1000 / accelerationFactor);

  fry.stop().animate({
    backgroundPositionX: '0vw'
  }, {
    duration: helperFry.timeRemaining / accelerationFactor,
    easing: 'linear'
  });
}

function fryFry(target, country) {
  target.attr('id', country.code);
  var progress = msToTime(country.tpb - timeElapsed);
  if ((country.tpb - timeElapsed) < 1000) progress = 'finished!';
  target.html('<span loaded=true class="country-field ' + country.code + '">' + country.name + '</span> – <span loaded=true class="tpb-field ' + country.code + '">' + progress + '</span>');
  target.css('background-image', 'url(' + fryRandomiser() + ')');

  var fryDistanceToCover = Math.abs(parseInt(target.css('background-position-x')));
  var fryDistanceCovered = fryDistanceToCover * timeElapsed / country.tpb;
  if (fryDistanceCovered !== 0) target.css('background-position-x', -(fryDistanceToCover) + fryDistanceCovered);

  fries[target.attr('id')] = {
    'duration': country.tpb,
    'timeRemaining': country.tpb - timeElapsed,
    'intervalID': null
  };

  animateFry(target, 1);
  target.on('mousedown touchstart', function() {
    $('.french-fry').each(function() {
      animateFry($(this), 200);
    });
  });
  target.on('mouseup touchend', function() {
    $('.french-fry').each(function() {
      animateFry($(this), 1);
    });
  });
}

function setTimeElapsed(value) {
  if (value !== undefined) {
    timeElapsed = value;
    return;
  }
  var firstFry = fries[Object.keys(fries)[0]];
  timeElapsed = firstFry.duration - firstFry.timeRemaining;
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