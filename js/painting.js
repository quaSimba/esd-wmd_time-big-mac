// based on http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/, enriched by Simon with touch support and colour change

var brush = new Image();
var brushes = ['/resources/img/texture_brush-1.png', '/resources/img/texture_brush-2.png', '/resources/img/texture_brush-3.png', '/resources/img/texture_brush-4.png', '/resources/img/texture_brush-1.png', '/resources/img/texture_brush-2.png', '/resources/img/texture_brush-4.png', '/resources/img/texture_brush-1.png'];
var strokeCounter = 0;
brush.src = brushes[strokeCounter];

var canvas = $('#canvas');
var ctx = canvas[0].getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';
var hasStroked = false;

var isDrawing, lastPoint;
var canvasBounds = canvas[0].getBoundingClientRect();

enablePainting();


function enablePainting() {
  canvas.on('mousedown touchstart', handleDrawingStart);
  canvas.on('mousemove touchmove', handleDrawingInProgress);
  canvas.on('mouseup touchend', handleDrawingEnd);
}

function clearPainting() {
  ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
  hasStroked = false;
  strokeCounter = 0;
  brush.src = brushes[strokeCounter];
  enablePainting();
}

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

  //change the brush colour
  if (hasStroked) strokeCounter++;
  hasStroked = false;
  brush.src = (strokeCounter < 8) ? brushes[strokeCounter] : disablePainting();
}

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

function disablePainting() {
  canvas.off();
}