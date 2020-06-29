// Based on http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/, enriched with a responsive canvas, a reset buton, changing instructions, touch support, a custom brush and colour change

// Defining a brush pack for the different burger layers
var brush = new Image();
var brushes = ['resources/img/texture_brush-1.png', 'resources/img/texture_brush-2.png', 'resources/img/texture_brush-3.png', 'resources/img/texture_brush-4.png', 'resources/img/texture_brush-1.png', 'resources/img/texture_brush-2.png', 'resources/img/texture_brush-4.png', 'resources/img/texture_brush-1.png'];
var strokeCounter = 0;
brush.src = brushes[strokeCounter];

// A list of instructions for the seperate painting steps
var paintingInstructions = [
  'Draw your Big Mac above.</br>First comes a bun.',
  'Now 100% beef.',
  'We love it cheesy.',
  'Don\'t forget to eat your greens!',
  'Here comes another bun.',
  'Beef it up again!',
  'Letuce, please.',
  'Top it with more bread.'
];

// Fill the painting instructions of the HTML with the first Instruction
$('#painting-instructions').html(paintingInstructions[strokeCounter]);

var canvas = $('<canvas width="300px" height="200px"id="canvas"></canvas>');
var canvasWrapper, isDrawing, lastPoint, canvasBounds, hasStroked, ctx;

// Instantiate the canvas according to initial screen size and enable it
loadCanvas();
enablePainting();

// size the canvas according to current screen resolution
function loadCanvas() {
  canvasWrapper = $('#canvas-wrapper');
  canvas = $('<canvas width="' + canvasWrapper.innerWidth() + '" height="' + canvasWrapper.innerHeight() + '"id="canvas"></canvas>');
  canvasWrapper.prepend(canvas);
  ctx = canvas[0].getContext('2d');
  ctx.lineJoin = ctx.lineCap = 'round';
  hasStroked = false;
  canvasBounds = canvas[0].getBoundingClientRect();
}

// Add EventListeners to the canvas to start, pursue and end a stroke
function enablePainting() {
  canvas.on('mousedown touchstart', handleDrawingStart);
  canvas.on('mousemove touchmove', handleDrawingInProgress);
  canvas.on('mouseup touchend', handleDrawingEnd);
}

// Reset the canvas
function clearPainting() {
  ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
  hasStroked = false;
  strokeCounter = 0;
  brush.src = brushes[strokeCounter];
  $('#painting-instructions').html(paintingInstructions[strokeCounter]);
  $('#painting-instructions').removeAttr('hidden');
  if ($('#serve-button').length) {
    $('#serve-button').remove();
    enablePainting();
  }
}

// Disable the canvas when finished, adding a button to get to the next page
function finishPainting() {
  canvas.off();
  $('#painting-instructions').attr('hidden', 'true');
  $('#painting-instructions').after('<button type="button" name="finish-painting" id="serve-button" onclick="loadNiceTry()">Serve it!</button>');
}

// Functions to render the painting and keep track of its state (most is based on the source provided at the start of this file)
function handleDrawingStart(e) {
  e.preventDefault();
  isDrawing = true;
  lastPoint = {
    x: (e.clientX || e.touches[0].clientX) - canvasBounds.left,
    y: (e.clientY || e.touches[0].clientY) - canvasBounds.top
  };
}

function handleDrawingInProgress(e) {
  e.preventDefault();
  if (!isDrawing) return;

  var currentPoint = {
    x: (e.clientX || e.touches[0].clientX) - canvasBounds.left,
    y: (e.clientY || e.touches[0].clientY) - canvasBounds.top
  };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);

  for (var i = 0; i < dist; i++) {
    x = lastPoint.x + (Math.sin(angle) * i) - 25;
    y = lastPoint.y + (Math.cos(angle) * i) - 25;
    ctx.drawImage(brush, x, y);
  }
  lastPoint = currentPoint;

  hasStroked = true;
}

function handleDrawingEnd(e) {
  e.preventDefault();
  isDrawing = false;

  //change the brush colour and instructions
  if (hasStroked) strokeCounter++;
  hasStroked = false;
  brush.src = (strokeCounter < 8) ? brushes[strokeCounter] : finishPainting();
  $('#painting-instructions').html(paintingInstructions[strokeCounter]);
}

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

// Listen to resizing of the window and resize the canvas
window.addEventListener("resize", function() {
  clearPainting();
  loadCanvas();
  enablePainting();
});