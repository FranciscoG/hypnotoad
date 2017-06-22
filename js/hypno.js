
/*
  sources
  
  A good explanation and recreation of the sound (with some history of it too)
  http://www.scottsmitelli.com/articles/everybody-imitates-hypnotoad
  
  How to make Brownian noise with Web Audio API
  but I didn't use it
  https://noisehack.com/generate-noise-web-audio-api/
  
  p5 sound!
  https://github.com/processing/p5.js-sound
 */

/* global p5 */


var noise = new p5.Noise('brown');

var delay = new p5.Delay();
delay.process(noise, 0.025, 0.8);

var isplaying = false;

var btn = document.getElementById('start');
btn.addEventListener('click', function(e){
  if (!isplaying) {
    e.target.textContent = "Stop";
    noise.start();
    isplaying = true;
  } else {
    e.target.textContent = "Play";
    noise.stop();
    isplaying = false;
  }
});