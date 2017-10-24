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
 */

var noise;
var delay;
function setup() {
  createCanvas(200, 200);
  noise = new p5.Noise('brown');
  delay = new p5.Delay();
  delay.process(noise, 0.025, 0.8);
}

function drawPupil() {
  var w = 50;
  var h = 50;
  var strokeW = 5;
  
  stroke('yellow');
  strokeWeight(strokeW);
  fill('black');
  ellipse(100, 100, w, h);

  stroke('red');
  strokeWeight(3);
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

  if (mouseIsPressed) {
    noise.start();
  }
}