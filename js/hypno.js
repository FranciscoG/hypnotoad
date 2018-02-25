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
}

function makeBlurryCircle(){
  cir = createGraphics(150, 150);
  cir.background(0,0,0,0);
  cir.fill('black');
  cir.noStroke();
  cir.ellipse(50,50,80,80);
  cir.filter(BLUR,4);
}

function drawPupil() {
  var w = 100;
  var h = 100;
  var strokeW = 10;
  
  stroke('yellow');
  strokeWeight(strokeW/2);
  fill('black');
  ellipse(100, 100, w, h);

  stroke('red');
  strokeWeight(strokeW/2);
  fill('black');
  ellipse(100, 100, w-strokeW, h-strokeW);
  
}

function draw() {
  
  // background of the eye
  stroke(0,0,0);
  strokeWeight(2);
  fill(167,140,21);
  ellipse(100, 100, 160, 160);

  drawPupil();

  // makeBlurryCircle();
  // image( cir, 50, 50 );

  if (mouseIsPressed) {
    noise.start();
  }
}