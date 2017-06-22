import processing.sound.*;

BrownNoise noise;
Delay delay;

float feedback = 0.85;

void setup() {
  size(640, 360);
  background(255);
  
  // create a delay effect
  delay = new Delay(this);
    
  // Create the noise generator
  noise = new BrownNoise(this);
  noise.play();
  
  delay.process(noise, 1);
  delay.time(0.025);
  delay.feedback(feedback);
}      

void draw() {
}

void keyPressed() {
  print(key);
  if (key == CODED) {
    
    if (keyCode == UP) {
      feedback = feedback + 0.01;
    } else if (keyCode == DOWN && feedback > 0.0) {
      feedback = feedback - 0.01;
    }
    
    delay.feedback(feedback);
    print(feedback + "\n");
     
  }
}