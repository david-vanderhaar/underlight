class Particle {
  constructor(x_, y_, s_, c_, sketch){
    this.x = x_;
    this.y = y_;
    this.size = s_;
    this.c = c_;
    this.sketch = sketch

    this.alpha = 70; 
    // this.dist = 0.75;
    this.dist = 1;
  }
  move(){
    let theta = this.sketch.noise(this.x * this.sketch.squiggliness, this.y * this.sketch.squiggliness) * p5.PI * 2;
    let v = p5.Vector.fromAngle(theta, this.dist) 
    this.x += v.x;
    this.y += v.y;
    this.alpha *= 1;

  }
  draw(){
    this.sketch.fill('#d0cfd0')
    // fill(this.c)
    // if (!isWithinCircle(this.x, this.y, width / 2, height / 2, 125)) {
    //   // return
    //   fill(BACKGROUND_COLOR)
    //   // fill('#dcdcdc')
    // }
    let size = this.size
    // if (isWithinCircle(this.x, this.y, (width / 2) - 50, (height / 2) - 100, 75)) {
    // if (isWithinCircle(this.x, this.y, (width / 2), (height / 2), 75)) {
    if (this.sketch.isWithinCircle(this.x, this.y, (this.sketch.width / 2), (this.sketch.height / 2), 200)) {
      this.sketch.fill(this.c)
      // fill('#d0cfd0')
      // size = 1.4
    }
    // console.log(this.x, this.y, size);
    this.sketch.ellipse(this.x, this.y, size)
  }
  stop(){
    // console.log('stop');
    if(this.x>this.sketch.width || this.x<0){
      this.dist = 0;
    }
    if(this.y>this.sketch.height || this.height<0){
      this.dist = 0;
    }
  }
}

const sketch_instance = (sketch) => {
  let particles = [];
  let n = 300;
  let pal;
  let squiggliness = 1/550;
  let lineStroke = 1;

  // let freq = 1;
  let freq = 2;
  // let freq = 4;
  // let BACKGROUND_COLOR = 'none'
  let BACKGROUND_COLOR = '#312f2c'

  sketch.setup = function () {
    canvas = sketch.createCanvas(600, 600);
    // canvas.parent('generate');
    sketch.background(BACKGROUND_COLOR)
    
    sketch.noStroke();
    pal = ["#04a3bd", "#f0be3d", "#931e18", "#da7901", "#247d3f", "#20235b"]//Lakota
    // pal = ['#9c9b97']
    sketch.updateParticles();
  }

  sketch.draw = function () {
    for (let p of particles) {
      p.draw();
      p.move();
      p.stop();
    }
  }

  sketch.updateParticles = function () {
    particles = [];
    for(let x = 0; x<sketch.width; x+=freq){
      let x_ = x;
      let s_ = lineStroke;
      let cNum = sketch.floor(sketch.random(pal.length))
      let c_ = sketch.color(pal[cNum])
      particles.push(new Particle(x_, 0, s_, c_, sketch));
      particles.push(new Particle(x_, sketch.height, s_, c_, sketch));
    }
    for(let y = 0; y< sketch.height; y+=freq){
      let y_ = y;
      let s_ = lineStroke;
      let cNum = sketch.floor(sketch.random(pal.length))
      let c_ = sketch.color(pal[cNum])
      particles.push(new Particle(0, y_, s_, c_, sketch));
      particles.push(new Particle(sketch.width, y_, s_, c_, sketch));
    }
  }

  sketch.isWithinCircle = function (x, y, cx, cy, r) {
    let distanceSquared = (x - cx) ** 2 + (y - cy) ** 2;
    let radiusSquared = r ** 2;
    return distanceSquared <= radiusSquared;
  }
}

// console.log(document.getElementById('sketch_1'));
let sketch_1 = new p5(sketch_instance, document.getElementById('sketch_1'));
let sketch_2 = new p5(sketch_instance, document.getElementById('sketch_2'));