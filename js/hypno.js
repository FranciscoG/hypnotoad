/* global p5 */
/// <reference path="../p5_types/global.d.ts" />
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
var cir;
function setup() {
  createCanvas(200, 200);
  noise = new p5.Noise("brown");
  delay = new p5.Delay();
  delay.process(noise, 0.025, 0.8);
  frameRate(60);
}

class WigglePoint {
  constructor(p, range) {
    this.speed = 0.5;
    this.dirX = "right";
    this.dirY = "up";

    this.minX = p.x - range;
    this.maxX = p.x + range;

    this.minY = p.y - range;
    this.maxY = p.y + range;
  }

  x(x) {
    if (x < this.maxX && this.dirX === "right") {
      x = x + 1;
    } else if (x > this.minX && this.dirX === "left") {
      x = x - 1;
    }

    if (x >= this.maxX) {
      this.dirX = "left";
    } else if (x <= this.minX) {
      this.dirX = "right";
    }

    return x;
  }

  y(y) {
    if (y > this.minY && this.dirY === "up") {
      y = y - this.speed;
    } else if (y < this.maxY && this.dirY === "down") {
      y = y + this.speed;
    }

    if (y <= this.minY) {
      this.dirY = "down";
    } else if (y >= this.maxY) {
      this.dirY = "up";
    }
    return y;
  }

  wiggle(p) {
    return { x: this.x(p.x), y: this.y(p.y) };
  }
}

class MoveInRange {
  constructor(min, max, speed) {
    this.flip = false;
    this.speed = speed;
    this.min = min;
    this.max = max;
  }

  // TODO, animate with easing

  // this just does a linear animation
  move(point) {
    if (point > this.min && !this.flip) {
      point = point - this.speed;
    } else if (point < this.max && this.flip) {
      point = point + this.speed;
    }

    if (point <= this.min) {
      this.flip = true;
    } else if (point >= this.max) {
      this.flip = false;
    }
    return point;
  }
}

// this is the starting x,y point
var p1 = { x: 65, y: 80 };
var wiggleP1 = new WigglePoint(p1, 1);

var p2 = { x: 200 - p1.x, y: p1.y };
var wiggleP2 = new WigglePoint(p2, 1);

var p3 = { x: p2.x, y: 200 - p1.y };
var wiggleP3 = new WigglePoint(p3, 1);

var p4 = { x: p1.x, y: p3.y };
var wiggleP4 = new WigglePoint(p4, 1);

// top - moving the control points of the curves to go from curve to flat and back
var aX = 85;
var aY = 45;
var moveAY = new MoveInRange(30, 80, 5);

// right side - wiggle
var bX = 175;
var bY = 80;
var widdleB = new WigglePoint({ x: bX, y: bY }, 2);

// Bottom - moving the control points of the curves to go from curve to flat and back
var cX = 115;
var cY = 148;
var moveCY = new MoveInRange(120, 150, 3);

// left side - wiggle
var dX = 25;
var dY = 120;
var widdleD = new WigglePoint({ x: dX, y: dY }, 1);

function drawPupil() {
  var strokeW = 10;

  stroke("yellow");
  strokeWeight(strokeW / 2);
  fill("black");

  beginShape();

  // starting x, y
  vertex(p1.x, p1.y);
  p1 = wiggleP1.wiggle(p1);

  // bezierVertex(cpx1, cpy1, cpx2, cpy2, x, y);

  // In order to make two curves A and B smoothly continuous:
  // the last control point of A, the last point of A, and the first control point of B have to be on a straight line.
  // A:[cpx2,cpy2], A:[x,y], B:[cpx1, cpy1] <-- all on a straight line

  // top curve
  // var aX = 85;
  // var aY = 45;
  var aX2 = 200 - aX;
  var aY2 = aY;
  bezierVertex(aX, aY, aX2, aY2, p2.x, p2.y);
  p2 = wiggleP2.wiggle(p2);
  aY = moveAY.move(aY);

  // right side curve
  // var bX = 175;
  // var bY = 200 - 120;
  var bX2 = bX;
  var bY2 = 120;
  bezierVertex(bX, bY, bX2, bY2, p3.x, p3.y);
  p3 = wiggleP3.wiggle(p3);
  var b = widdleB.wiggle({ x: bX, y: bY });
  bX = b.x;
  bY = b.y;

  // bottom curve
  // var cX = 115;
  // var cY = 148;
  var cX2 = 200 - cX;
  var cY2 = cY;
  bezierVertex(cX, cY, cX2, cY2, p4.x, p4.y);
  p4 = wiggleP4.wiggle(p4);
  cY = moveCY.move(cY);

  // left side curve
  // var dX = 25;
  // var dY = 120;
  var dX2 = dX;
  var dY2 = 200 - dY;
  bezierVertex(dX, dY, dX2, dY2, p1.x, p1.y);
  var d = widdleD.wiggle({ x: dX, y: dY });
  dX = d.x;
  dY = d.y;

  endShape();
  return;

  // just to show where the curve points are
  var size = 3;

  // yellow
  ellipse(aX, aY, size, size);
  ellipse(aX2, aY2, size, size);

  stroke("red");
  ellipse(bX, bY, size, size);
  ellipse(bX2, bY2, size, size);

  stroke("green");
  ellipse(cX, cY, size, size);
  ellipse(cX2, cY2, size, size);

  stroke("blue");
  ellipse(dX, dY, size, size);
  ellipse(dX2, dY2, size, size);
}

function eyeBackground() {
  // background of the eye
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(167, 140, 21);
  ellipse(100, 100, 160, 160);
}

function draw() {
  eyeBackground();
  drawPupil();
}

function mousePressed() {
  if (noise.started) {
    noise.stop();
  } else {
    noise.start();
  }
}
