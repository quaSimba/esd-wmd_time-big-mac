var upperContent, lowerContent, infoContent, burgerContainer;
$(document).ready(
  function() {
    $('body').disablescroll();

    upperContent = $('#upper-content');
    lowerContent = $('#lower-content');
    infoContent = $('#info-content');
    burgerContainer = $('#burger-container');
    //loadStart();
    //loadPainting();
    //loadContract();
    lowerContent.removeAttr('hidden');

    loadScript("js/french-fries.js", function() {
      loadNiceTry();
      //loadChart();
    });
    loadHTML('#info-content', 'ajax/info.html');
  }
);

// please round tpb to full seconds / 1000 ms
var countries = {
  "AU": {
    "code": "country-au",
    "name": "Australia",
    "greetingFormular": "G'day",
    "salary": 13.4,
    "employeeNumber": "90,001",
    "tpb": 1048000
  },
  "IN": {
    "code": "country-in",
    "name": "India",
    "greetingFormular": "Namaste",
    "salary": 0.66,
    "employeeNumber": "#4,001",
    "tpb": 12928000
  },
  "IT": {
    "code": "country-it",
    "name": "Italy",
    "greetingFormular": "Ciao",
    "salary": 9.2,
    "employeeNumber": "#3,045",
    "tpb": 1840000
  },
  "ME": {
    "code": "country-me",
    "name": "Mexico",
    "greetingFormular": "Hola",
    "salary": 1,
    "employeeNumber": "#11,501",
    "tpb": 10080000
  },
  "US": {
    "code": "country-us",
    "name": "America",
    "greetingFormular": "Hey",
    "salary": 9.03,
    "employeeNumber": "#210,001",
    "tpb": 2196000
  },
  "ZA": {
    "code": "country-za",
    "name": "South Africa",
    "greetingFormular": "Hallo",
    "salary": 0.97,
    "employeeNumber": "#10,001",
    "tpb": 11880000
  }
};

var homeCountry = {
  "code": "country-mw",
  "name": "Mid World",
  "greetingFormular": "Long days and pleasant nights",
  "salary": 1,
  "employeeNumber": "#1",
  "tpb": 1000000
};

var isInfoLoaded = false;



function loadStart() {
  collapseHeader(false);
  wipeContents();
  loadHTML('#info-content', 'ajax/info.html');
  loadHTML('#upper-content', 'ajax/texts.html #welcome-text');
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags', function() {
    loadScript("js/flag-events.js");
  });
}

function loadContract() {
  collapseHeader(true);
  upperContent.empty();
  loadHTML('#lower-content', 'ajax/contract.html', function() {
    $('#mayo-1').animate({
      left: '-300px'
    }, 1);
    $('#mayo-1').animate({
      left: '0px'
    }, "slow");
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    rePlaceholders([homeCountry]);
  });
  lowerContent.removeAttr('hidden');
}

function loadPainting() {
  collapseHeader(true);
  loadHTML('#burger-container', 'ajax/burger-background.html .burger-layer', function() {
    $('.burger-layer').animate({
      top: '-100px'
    }, "slow");
    $('#top-bun').animate({
      top: '-500px',
      left: '300px'
    }, "slow");

  });
  loadHTML('#upper-content', 'ajax/texts.html #new-order-text');
  lowerContent.load('ajax/canvas.html', ajaxError(), function() {
    $('#canvas').on('load', loadScript('js/painting.js'));
    lowerContent.removeAttr('hidden');
  });
}

function loadNiceTry() {
  collapseHeader(true);
  upperContent.empty();
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_middle-bun');
  loadHTML('#lower-content', 'ajax/nice-try.html', function() {
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    loadHTML('#burger-container', 'ajax/burger-background.html .burger-layer', function() {
      $('.burger-layer').remove('#top-bun');
      //      $('.burger-layer').remove('#burger-patty');
      $('.burger-layer').animate({
        top: '-200px'
      }, "slow");
      $('#burger-patty').animate({
        top: '-500px',
        left: '300px'
      }, "slow");
    });
    rePlaceholders([homeCountry]);
    fryFry($('#home-fry'), homeCountry);
  });
}

function loadChart() {
  collapseHeader(true);
  upperContent.empty();
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_bottom-bun');
  loadHTML('#lower-content', 'ajax/chart.html', function() {
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    loadHTML('#burger-container', 'ajax/burger-background.html .burger-layer', function() {
      $('.burger-layer').remove('#top-bun');
      $('.burger-layer').remove('#burger-patty');
      //      $('.burger-layer').remove('#middle-bun');
      $('.burger-layer').animate({
        top: '-280px'
      }, "slow");
      $('#middle-bun').animate({
        top: '-500px',
        left: '300px'
      }, "slow");
    });
    rePlaceholders([homeCountry]);
    setTimeElapsed();
    fryFry($('#home-fry'), homeCountry);
    var chartWrapper = $('#chart-wrapper');
    for (var key in countries) {
      if (countries[key] === homeCountry) continue;
      chartWrapper.append('<p class="french-fry"></p>');
      fryFry($('.french-fry:last'), countries[key]);
    }
    $('#fry-box').css('height', $('#chart-wrapper').outerHeight());
  });
}

function rePlaceholders(replaceCountries) {
  replaceCountries.forEach(function(country) {
    $('[loaded != true].' + country.code + '.country-field').each(function() {
      $(this).html(country.name);
      $(this).attr('loaded', 'true');
    });
    $('[loaded != true].' + country.code + '.greeting-field').each(function() {
      $(this).html(country.greetingFormular);
      $(this).attr('loaded', 'true');
    });
    $('[loaded != true].' + country.code + '.salary-field').each(function() {
      $(this).html(country.salary);
      $(this).attr('loaded', 'true');
    });
    $('[loaded != true].' + country.code + '.employee-field').each(function() {
      $(this).html(country.employeeNumber);
      $(this).attr('loaded', 'true');
    });
    $('[loaded != true].' + country.code + '.tpb-field').each(function() {
      $(this).html(msToTime(country.tpb));
      $(this).attr('loaded', 'true');
    });
  });
}

function toggleInfo() {
  infoContent.toggle();
  upperContent.toggle();
  burgerContainer.toggleClass('strong-blur');
  if (lowerContent.children().length) lowerContent.toggle();
  collapseHeader(lowerContent.is(':visible'));
}

function wipeContents() {
  upperContent.empty();
  lowerContent.empty();
}

function collapseHeader(choice) {
  if (choice) {
    $('#logo-big').attr('id', 'logo-small');
    $('#info-icon').css('margin-top', '10px');
    $('#slogan').attr('hidden', 'true');
  } else {
    $('#logo-small').attr('id', 'logo-big');
    $('#info-icon').css('margin-top', '20px');
    $('#slogan').removeAttr('hidden');
  }
}

function restart() {
  collapseHeader(false);
  if (infoContent.is(':visible')) toggleInfo();
  wipeContents();
  setTimeElapsed(0);
  fries = [];
  loadStart();
}

// helper functions:

// method to load external scripts
function loadScript(url, callback) {
  $.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
}

function loadHTML(target, source, callback) {
  $(target).load(source, ajaxError(), callback);
}

function ajaxError(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    console.log(msg + xhr.status + " " + xhr.statusText);
  }
}