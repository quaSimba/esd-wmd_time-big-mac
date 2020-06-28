var fryID = 0;
var fries = [];
var interval = null;

function fryRandomiser() {
  var fryImages = [
    'resources/img/french-fry-01.svg',
    'resources/img/french-fry-02.svg',
    'resources/img/french-fry-03.svg'
  ];
  return fryImages[Math.floor(Math.random() * fryImages.length)];
}

function animateFry(fry, accelerationFactor) {
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
      fry.find('.tpb-field').html("finished!");
      clearInterval(helperFry.intervalID);
    }
  }, 1000 / accelerationFactor);

  fry.stop().animate({
    backgroundPosition: '0px'
  }, {
    duration: helperFry.timeRemaining / accelerationFactor,
    easing: 'linear'
  });
}

function fryFry(target, country) {
  target.attr('id', country.code);
  target.html('<span loaded=true" class="country-field ' + country.code + '">' + country.name + '</span> – <span loaded=true class="tpb-field ' + country.code + '">' + msToTime(country.tpb) + '</span>');
  target.css('background-image', 'url(' + fryRandomiser() + ')');
  target.css('background-position', -target.outerWidth());
  fries[target.attr('id')] = {
    'duration': country.tpb,
    'timeRemaining': country.tpb,
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