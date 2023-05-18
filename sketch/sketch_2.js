let particles = [];
let n = 300;
let pal;
let squiggliness = 1/550;
let lineStroke = 1;

// let freq = 1;
let freq = 2;
// let freq = 4;
let BACKGROUND_COLOR = 'none'
// let BACKGROUND_COLOR = '#312f2c'

function setup(){
  c = createCanvas(600, 600);
  c.parent('generate_2');
  background(BACKGROUND_COLOR)
  
  noStroke();
  pal = ["#04a3bd", "#f0be3d", "#931e18", "#da7901", "#247d3f", "#20235b"]//Lakota
  // pal = ['#9c9b97']
  updateParticles();
}

function draw(){
  for (let p of particles) {
    p.draw();
    p.move();
    p.stop();
  }
}

function updateParticles(){
  particles = [];
  for(let x = 0; x<width; x+=freq){
    let x_ = x;
    let s_ = lineStroke;
    let cNum = floor(random(pal.length))
    let c_ = color(pal[cNum])
    particles.push(new Particle(x_, 0, s_, c_));
    particles.push(new Particle(x_, height, s_, c_));
  }
  for(let y = 0; y< height; y+=freq){
    let y_ = y;
    let s_ = lineStroke;
    let cNum = floor(random(pal.length))
    let c_ = color(pal[cNum])
    particles.push(new Particle(0, y_, s_, c_));
    particles.push(new Particle(width, y_, s_, c_));
  }
}

class Particle {
  constructor(x_, y_, s_, c_){
    this.x = x_;
    this.y = y_;
    this.size = s_;
    this.c = c_;

    this.alpha = 70; 
    // this.dist = 0.75;
    this.dist = 1;
  }
  move(){
    let theta = noise(this.x * squiggliness, this.y * squiggliness) * PI * 2;
    let v = p5.Vector.fromAngle(theta, this.dist) 
    this.x += v.x;
    this.y += v.y;
    this.alpha *= 1;

  }
  draw(){
    fill('#d0cfd0')
    // fill(this.c)
    if (!isWithinCircle(this.x, this.y, width / 2, height / 2, 125)) {
      // return
      fill(BACKGROUND_COLOR)
      // fill('#dcdcdc')
    }
    let size = this.size
    if (isWithinCircle(this.x, this.y, (width / 2) - 50, (height / 2) - 100, 75)) {
    // if (isWithinCircle(this.x, this.y, (width / 2), (height / 2), 75)) {
    // if (isWithinCircle(this.x, this.y, (width / 2), (height / 2), 200)) {
      fill(this.c)
      // fill('#d0cfd0')
      // size = 1.4
    }
    ellipse(this.x, this.y, size)
  }
  stop(){
    if(this.x>width || this.x<0){
      this.dist = 0;
    }
    if(this.y>height || this.height<0){
      this.dist = 0;
    }
  }
}

function isWithinCircle(x, y, cx, cy, r) {
  let distanceSquared = (x - cx) ** 2 + (y - cy) ** 2;
  let radiusSquared = r ** 2;
  return distanceSquared <= radiusSquared;
}