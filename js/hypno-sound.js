/* global p5 */
/// <reference path="../p5_types/global.d.ts" />

/*****************************************************
 * HypnoToad Sound Module
 *
 * Handles all sound-related functionality for the HypnoToad animation
 *
 * Sources:
 * A good explanation and recreation of the sound (with some history of it too)
 * http://www.scottsmitelli.com/articles/everybody-imitates-hypnotoad
 *
 * How to make Brownian noise with Web Audio API
 * but I didn't use it
 * https://noisehack.com/generate-noise-web-audio-api/
 *
 * p5 sound!
 * https://github.com/processing/p5.js-sound
 */

class HypnoSound {
  constructor() {
    this.noise = new p5.Noise("brown");
    this.delay = new p5.Delay();
    this.delay.process(this.noise, 0.025, 0.8);
  }

  start() {
    this.noise.start();
  }

  stop() {
    this.noise.stop();
  }

  // Toggle sound on/off
  toggle() {
    if (this.noise.started) {
      this.stop();
    } else {
      this.start();
    }
  }

  // Check if sound is currently playing
  isPlaying() {
    return this.isInitialized && this.noise && this.noise.started;
  }
}

// Create a global instance
var hypnoSound = new HypnoSound();

function mousePressed() {
  hypnoSound.toggle();
}
