//TODO: Refactor this entire thing lmao
let canvas;
let ctx;
let appWidth;
let appHeight;
var img = new Image();
img.src = 'img/img.jpg';

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  let speed = 300; // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#ffffff' });
}

function draw() {
  ctx.drawImage(img,0,0);
  pointillize();
}

function pointillize() {
  var imgData = ctx.getImageData(0,0,img.width,img.height);
  var data = imgData.data;

  i = 0

  while(i/4 <= imgData.height * imgData.width) {
    coordinates = find_coordinates(imgData, i)
    red = imgData.data[i];
    green = imgData.data[i+1];
    blue = imgData.data[i+2];
    alpha = imgData.data[i+3];
    drawPoint(coordinates.x+600, coordinates.y, rgbToHex(red,green,blue), alpha);
    i += NOOPBOT_RANDOM(4, 8) * 4
  }
}

function find_coordinates(imgData, data_index) {
  totalPixels = imgData.width * imgData.height
  pixelIndex = (data_index / 4) - 1
  x = pixelIndex % imgData.width
  y = pixelIndex / imgData.width
  return {x:x,y:y}
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function drawPoint(x, y, color, alpha) {
  ctx.fillStyle = color;
  let pointSize = NOOPBOT_RANDOM(4,8);
  ctx.globalAlpha = alpha
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, Math.PI * 2);
  ctx.fill();
}

