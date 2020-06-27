// kick-starting fullpage
$(document).ready(
  function() {
    initFullpage();
    //loadStart();
    //loadPainting();
    //loadContract();
    $('#lower-content').removeAttr('hidden');
    loadScript("js/french-fries.js", function() {
      loadNiceTry();
      //loadChart();
    });
  }
);

var countries = {
  "AU": {
    "code": "country-au",
    "name": "Australia",
    "greetingFormular": "G'day",
    "salary": 13.4,
    "employeeNumber": "90,001",
    "tpb": 1047600
  },
  "IN": {
    "code": "country-in",
    "name": "India",
    "greetingFormular": "Namaste",
    "salary": 0.66,
    "employeeNumber": "#4,001",
    "tpb": 12927600
  },
  "IT": {
    "code": "country-it",
    "name": "Italy",
    "greetingFormular": "Ciao",
    "salary": 9.2,
    "employeeNumber": "#3,045",
    "tpb": 1839600
  },
  "ME": {
    "code": "country-me",
    "name": "Mexico",
    "greetingFormular": "Hola",
    "salary": 1,
    "employeeNumber": "#11,501",
    "tpb": 10080000
  },
  "MW": {
    "code": "country-mw",
    "name": "Mid World",
    "greetingFormular": "Long days and pleasant nights",
    "salary": 1,
    "employeeNumber": "#1",
    "tpb": 100000
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

var homeCountry = countries.MW;

var isInfoLoaded = 0;

function initFullpage() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling: false,
    scrollHorizontally: false,
    verticalCentered: false,
    responsiveWidth: 0,
    responsiveHeight: 0,
  });

  //methods
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setKeyboardScrolling(false);
}

function loadStart() {
  loadHTML('#upper-content', 'ajax/texts.html #welcome-text');
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-flags');
  loadScript("js/flag-events.js");
}

function loadContract() {
  collapseHeader();
  $('#upper-content').empty();
  loadHTML('#lower-content', 'ajax/contract.html', function() {
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    rePlaceholders([homeCountry]);
  });
  $('#lower-content').removeAttr('hidden');
}


function loadInfo() {
  if (isInfoLoaded == 0) {
    $('#lower-content').removeAttr('hidden');
    $('#upper-content').attr('hidden', 'true');
    $('#lower-content').empty();
    loadHTML('#lower-content', 'ajax/info.html');
    isInfoLoaded = 1;
  } else {
    $('#lower-content').attr('hidden', 'true');
    $('#upper-content').removeAttr('hidden');
    $('#lower-content').empty();
    isInfoLoaded = 0;
  }
}

function loadPainting() {
  $('#upper-content').empty();
  loadHTML('#upper-content', 'ajax/texts.html #new-order-text');
  $('#lower-content').empty();
  $('#lower-content').removeAttr('hidden');
  $('#lower-content').load('ajax/canvas.html', ajaxError(), function() {
    $('#canvas').on('load', loadScript('js/painting.js'));
  });
  loadHTML('#burger-container', 'ajax/burger-background.html #burger-patty');
}

function loadNiceTry() {
  $('#upper-content').empty();
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_middle-bun');
  loadHTML('#lower-content', 'ajax/nice-try.html', function() {
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    rePlaceholders([homeCountry]);
    fryFry($('#home-fry'), homeCountry);
  });
}

function loadChart() {
  $('#upper-content').empty();
  loadHTML('#burger-container', 'ajax/burger-background.html #burger_bottom-bun');
  loadHTML('#lower-content', 'ajax/chart.html', function() {
    $('.home-country').each(function() {
      $(this).addClass(homeCountry.code);
    });
    rePlaceholders([homeCountry]);
    fryFry($('#home-fry'), homeCountry);
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

function collapseHeader() {
  $('#logo-big').attr('id', 'logo-small');
  $('#slogan').attr('hidden', 'true');
  $('#info-icon').css('margin-top', '10px');
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