/* global p5, hypnoSound */
/// <reference path="../p5_types/global.d.ts" />
/*****************************************************
 *  HypnoToad Eye Animation
 
  sources
  
  animation example
  https://codepen.io/chiunhauyou/pen/LkjvYw?editors=0010

  blurred edges
  https://forum.processing.org/one/topic/blurred-edges-ellipse.html

 */

var animationSpeed = 0.75;

function setup() {
  createCanvas(200, 200);
  frameRate(60);

  // Initialize sound system
  hypnoSound.init();
}

// Function to change animation speed
function setAnimationSpeed(speed) {
  animationSpeed = speed;
  // Update existing instances
  wiggleP1.setSpeed(0.5 * animationSpeed);
  wiggleP2.setSpeed(0.5 * animationSpeed);
  wiggleP3.setSpeed(0.5 * animationSpeed);
  wiggleP4.setSpeed(0.5 * animationSpeed);
  widdleB.setSpeed(0.5 * animationSpeed);
  widdleD.setSpeed(0.5 * animationSpeed);
  moveAY.setSpeed(7 * animationSpeed);
  moveCY.setSpeed(6 * animationSpeed);
}

class WigglePoint {
  constructor(p, range, speed = 0.5) {
    this.speed = speed;
    this.baseSpeed = speed; // Store original speed for scaling
    this.dirX = "right";
    this.dirY = "up";

    this.minX = p.x - range;
    this.maxX = p.x + range;

    this.minY = p.y - range;
    this.maxY = p.y + range;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  x(x) {
    if (x < this.maxX && this.dirX === "right") {
      x = x + 1 * animationSpeed;
    } else if (x > this.minX && this.dirX === "left") {
      x = x - 1 * animationSpeed;
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
    this.baseSpeed = speed; // Store original speed for scaling
    this.min = min;
    this.max = max;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
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
var wiggleP1 = new WigglePoint(p1, 2);

var p2 = { x: 200 - p1.x, y: p1.y };
var wiggleP2 = new WigglePoint(p2, 2);

var p3 = { x: p2.x, y: 200 - p1.y };
var wiggleP3 = new WigglePoint(p3, 2);

var p4 = { x: p1.x, y: p3.y };
var wiggleP4 = new WigglePoint(p4, 2);

// top - moving the control points of the curves to go from curve to flat and back
var aX = 85;
var aY = 45;
var moveAY = new MoveInRange(25, 85, 7); // Increased range and speed for more dramatic waves

// right side - wiggle
var bX = 175;
var bY = 80;
var widdleB = new WigglePoint({ x: bX, y: bY }, 2);

// Bottom - moving the control points of the curves to go from curve to flat and back
var cX = 115;
var cY = 148;
var moveCY = new MoveInRange(115, 155, 6); // Increased range and speed for more dramatic waves

// left side - wiggle
var dX = 25;
var dY = 120;
var widdleD = new WigglePoint({ x: dX, y: dY }, 1);

function drawPupilShape(borderOffset = 0) {
  beginShape();

  // starting x, y (adjusted for border offset)
  var p1Adjusted = { x: p1.x - borderOffset, y: p1.y - borderOffset };
  vertex(p1Adjusted.x, p1Adjusted.y);

  // top curve - enhanced wave motion for "lip-like" movement
  var aX2 = 200 - aX;
  var aY2 = aY;
  var p2Adjusted = { x: p2.x + borderOffset, y: p2.y - borderOffset };
  bezierVertex(
    aX - borderOffset,
    aY - borderOffset * 2,
    aX2 + borderOffset,
    aY2 - borderOffset * 2,
    p2Adjusted.x,
    p2Adjusted.y
  );

  // right side curve
  var bX2 = bX;
  var bY2 = 120;
  var p3Adjusted = { x: p3.x + borderOffset, y: p3.y + borderOffset };
  bezierVertex(bX + borderOffset, bY, bX2 + borderOffset, bY2, p3Adjusted.x, p3Adjusted.y);

  // bottom curve - enhanced wave motion for "lip-like" movement
  var cX2 = 200 - cX;
  var cY2 = cY;
  var p4Adjusted = { x: p4.x - borderOffset, y: p4.y + borderOffset };
  bezierVertex(
    cX + borderOffset,
    cY + borderOffset * 2,
    cX2 - borderOffset,
    cY2 + borderOffset * 2,
    p4Adjusted.x,
    p4Adjusted.y
  );

  // left side curve
  var dX2 = dX;
  var dY2 = 200 - dY;
  bezierVertex(dX - borderOffset, dY, dX2 - borderOffset, dY2, p1Adjusted.x, p1Adjusted.y);

  endShape();
}

function drawPupil() {
  // Add shake only to the pupil and its borders
  var shakeX = random(-1, 1);
  var shakeY = random(-1, 1);

  push();
  translate(shakeX, shakeY);

  // Draw multiple layers for blurred effect

  // Outermost border - thin orange
  stroke(255, 140, 0); // orange
  strokeWeight(2);
  fill(255, 140, 0, 50); // semi-transparent orange fill for blur effect
  drawPupilShape(8);

  // Second border - thick yellow (main border)
  stroke(255, 255, 0); // yellow
  strokeWeight(6);
  fill(255, 255, 0, 80); // semi-transparent yellow fill for blur effect
  drawPupilShape(6);

  // Third border - thin reddish-brown
  stroke(143, 43, 4); // reddish-brown
  strokeWeight(4);
  fill(143, 43, 4, 60); // semi-transparent reddish-brown fill for blur effect
  drawPupilShape(1);

  // Inner black oval
  stroke(0);
  strokeWeight(0);
  fill(0); // black
  drawPupilShape(0);

  pop();

  // Update animation variables
  p1 = wiggleP1.wiggle(p1);
  p2 = wiggleP2.wiggle(p2);
  p3 = wiggleP3.wiggle(p3);
  p4 = wiggleP4.wiggle(p4);

  aY = moveAY.move(aY);
  cY = moveCY.move(cY);

  var b = widdleB.wiggle({ x: bX, y: bY });
  bX = b.x;
  bY = b.y;

  var d = widdleD.wiggle({ x: dX, y: dY });
  dX = d.x;
  dY = d.y;
}

function eyeBackground() {
  // background of the eye
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(167, 140, 21);
  ellipse(100, 100, 160, 160);
}
