/* global p5 */
/*****************************************************
 *  HypnoToad Sound and Eye animation
 
  sources
  
  A good explanation and recreation of the sound (with some history of it too)
  http://www.scottsmitelli.com/articles/everybody-imitates-hypnotoad
  
  How to make Brownian noise with Web Audio API
  but I didn't use it
  https://noisehack.com/generate-noise-web-audio-api/
  
  p5 sound!
  https://github.com/processing/p5.js-sound

  animation example
  https://codepen.io/chiunhauyou/pen/LkjvYw?editors=0010

  blurred edges
  https://forum.processing.org/one/topic/blurred-edges-ellipse.html

 */

var noise;
var delay;
var cir
function setup() {
  createCanvas(200, 200);
  noise = new p5.Noise('brown');
  delay = new p5.Delay();
  delay.process(noise, 0.025, 0.8);
  frameRate(60);
}

function drawPupil() {
  var w = 100;
  var h = 100;
  var strokeW = 10;
  
  stroke('yellow');
  strokeWeight(strokeW/2);
  fill('black');

  push();
  beginShape();

  var p1 = [65, 80];
  var p2 = [200 - p1[0], p1[1]];
  var p3 = [p2[0], 200 - p1[1]];
  var p4 = [p1[0], p3[1]];

  // starting x, y
  vertex(p1[0], p1[1]); 

  // bezierVertex(cpx1, cpy1, cpx2, cpy2, x, y);

  // In order to make two curves A and B smoothly continuous:
  // the last control point of A, the last point of A, and the first control point of B have to be on a straight line.
  // A:[cpx2,cpy2], A:[x,y], B:[cpx1, cpy1] <-- all on a straight line
  
  // top curve
  var aX = 85;
  var aY = 45;
  var aX2 = 200 - aX;
  var aY2 = aY;
  bezierVertex(aX, aY, aX2, aY2, p2[0], p2[1]);
  
  // right side curve
  var bX = 175;
  var bY = 200 - 120;
  var bX2 = bX;
  var bY2 = 120;
  bezierVertex(bX, bY, bX2, bY2, p3[0], p3[1]);

  // bottom curve
  var cX = 200 - aX;
  var cY = 155;
  var cX2 = 200 - cX;
  var cY2 = cY;
  bezierVertex(cX, cY, cX2, cY2, p4[0], p4[1]);
  
  // left side curve
  var dX = 25;
  var dY = 120;
  var dX2 = dX;
  var dY2 = 200 - dY;
  bezierVertex(dX, dY, dX2, dY2, p1[0], p1[1]);
  
  endShape();
  pop();
  // return;

  // just to show where the curve points are
  var size = 3;

  // yello
  ellipse(aX, aY, size, size);
  ellipse(aX2, aY2, size, size);

  stroke('red');
  ellipse(bX, bY, size, size);
  ellipse(bX2, bY2, size, size);

  stroke('green');
  ellipse(cX, cY, size, size);
  ellipse(cX2, cY2, size, size);

  stroke('blue');
  ellipse(dX, dY, size, size);
  ellipse(dX2, dY2, size, size);

  // stroke('black')
  // ellipse(p1[0], p1[1], size, size);
  // ellipse(p2[0], p2[1], size, size);
  // ellipse(p3[0], p3[1], size, size);
  // ellipse(p4[0], p4[1], size, size);

  // stroke('red');
  // strokeWeight(strokeW/2);
  // fill('black');
  // ellipse(100, 100, w - strokeW, h - strokeW);
  
}

function eyeBackground() {
  // background of the eye
  stroke(0,0,0);
  strokeWeight(2);
  fill(167,140,21);
  ellipse(100, 100, 160, 160);
}

function draw() {
  eyeBackground();
  drawPupil();

  if (mouseIsPressed) {
    noise.start();
  }
}