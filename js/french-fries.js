var fryID = 0;
var fries = [];
var interval = null;

function fryRandomiser() {
  var fries = [
    'resources/img/french-fry-01.svg',
    'resources/img/french-fry-02.svg',
    'resources/img/french-fry-03.svg'
  ];
  return fries[Math.floor(Math.random() * fries.length)];
}

function animateFry(fry, duration, accelerationFactor) {
  fry.stop();
  clearInterval(interval);
  var tpbField = fry.find('.tpb-field');

  var timeRemaining = duration - fries[fry.attr('id')].timeElapsed;

  interval = setInterval(function() {
    if (timeRemaining > 1000) {
      timeRemaining -= 1000;
      tpbField.html(msToTime(timeRemaining));
      fries[fry.attr('id')].timeElapsed += 1000;
    } else {
      clearInterval(interval);
    }
  }, 1000 / accelerationFactor);

  fry.animate({
    backgroundPosition: '0px'
  }, {
    duration: timeRemaining / accelerationFactor,
    step: function(now, fx) {},
    easing: 'linear',
    done: function() {
      fry.find('.tpb-field').html("finished!");
    }
  });
}

function decreaseTime(tpbField, time) {
  tpbField.html(msToTime(time));
  return time -= 1000;
}

function fryFry(target, country) {
  target.html('<span loaded=true" class="country-field ' + country.code + '">' + country.name + '</span> – <span loaded=true class="tpb-field ' + country.code + '">' + msToTime(country.tpb) + '</span>');
  target.css('background-image', 'url(' + fryRandomiser() + ')');
  target.css('background-position', -target.outerWidth());
  fries[target.attr('id')] = {
    'timeElapsed': 0
  };
  animateFry(target, country.tpb, 1);
  target.on('mousedown touchstart', function() {
    animateFry(target, country.tpb, 20);
  }).on('mouseup touchend', function() {
    animateFry(target, country.tpb, 1);
  });
}