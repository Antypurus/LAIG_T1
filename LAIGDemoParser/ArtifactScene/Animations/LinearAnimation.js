/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(velocity, controlPoints) {
  this.matrix = mat4.create();
  this.controlPoints = controlPoints;
  this.Animationlength = 0;
  this.velocity = velocity;

  this.azimuth = [];
  this.elevation = [];
  this.currStep = 0;

  this.vx = [];
  this.vy = [];
  this.vz = [];

  this.deltaX = 0;
  this.deltaY = 0;
  this.deltaZ = 0;

  this.secondsElapsed = 0;
  this.prevTime = 0;
  this.finish = false;

  this.currTime = 0;

  this.setUp();
}

// Creates a LinearAnimation object using Animation Abstract Class
LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.setUp = function () {
  for (let i = 0; i < this.controlPoints.length - 1; ++i) {
    let vec = [];
    vec.push(this.controlPoints[i + 1][0] - this.controlPoints[i][0]);
    vec.push(this.controlPoints[i + 1][1] - this.controlPoints[i][1]);
    vec.push(this.controlPoints[i + 1][2] - this.controlPoints[i][2]);

    console.log("DELTA VEC:" + vec);

    this.azimuth.push(Math.atan2(vec[0], vec[2]));
    let ac = Math.sqrt(
      Math.pow(this.controlPoints[i + 1][0] - this.controlPoints[i][0], 2) +
      Math.pow(this.controlPoints[i + 1][2] - this.controlPoints[i][2], 2)
    );
    this.elevation.push(Math.atan2(vec[1], ac));
    //this.vx.push(
    //this.velocity * Math.cos(this.azimuth[i]) * Math.cos(this.elevation[i])
    //);
    //this.vy.push(
    //this.velocity * Math.sin(this.azimuth[i]) * Math.cos(this.elevation[i])
    //);
    //this.vz.push(this.velocity * Math.sin(this.elevation[i]));

    this.vx.push(vec[0] / this.velocity);
    this.vy.push(vec[1] / this.velocity);
    this.vz.push(vec[2] / this.velocity);
  }
};

LinearAnimation.prototype.update = function (currTime) {
  if(this.finish)
    return;
  var timeElapsed = 0;

  this.currTime = currTime / 1000;
  if (this.currStep >= this.controlPoints.length - 1) {
    this.finish = true;
  } else {
    if (this.currTime != 0) {
        this.deltaX += this.currTime * this.vx[this.currStep];
        this.deltaY += this.currTime * this.vy[this.currStep];
        this.deltaZ += this.currTime * this.vz[this.currStep];
    }
    console.log("time elapsed:" + timeElapsed);
    console.log("dx:" + this.deltaX + " vx:" + this.vx[this.currStep]);
    console.log("dy:" + this.deltaY + " vy:" + this.vy[this.currStep]);
    console.log("dz:" + this.deltaZ + " vz:" + this.vz[this.currStep]);

    let vec = [];
    vec.push(
      this.controlPoints[this.currStep + 1][0]
    );
    vec.push(
      this.controlPoints[this.currStep + 1][1]
    );
    vec.push(
      this.controlPoints[this.currStep + 1][2]
    );

    let f1 = false;
    let f2 = false;
    let f3 = false;

    if(vec[0]>=0){
      if(this.deltaX>=vec[0]){
        f1=true;
      }else{
        f1=false;
      }
    }else{
      if(this.deltaX<=vec[0]){
        f1=true;
      }else{
        f1=false;
      }
    }

    if(vec[1]>=0){
      if(this.deltaY>=vec[1]){
        f2=true;
      }else{
        f2=false;
      }
    }else{
      if(this.deltaY<=vec[1]){
        f2=true;
      }else{
        f2=false;
      }
    }

    if(vec[2]>=0){
      if(this.deltaZ>=vec[2]){
        f3=true;
      }else{
        f3=false;
      }
    }else{
      if(this.deltaZ<=vec[2]){
        f2=true;
      }else{
        f2=false;
      }
    }

    if (f1 && f2 && f3) {
      this.currStep++;
    }
      
  }
};

LinearAnimation.prototype.applyAnimation = function (matrix)
{
    mat4.translate(matrix, matrix, [
        this.deltaX,
        this.deltaY,
        this.deltaZ
    ]);
    this.matrix = matrix;
};

LinearAnimation.prototype.getCopy = function () {
    return new LinearAnimation(this.velocity, this.controlPoints.slice());
}

LinearAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}