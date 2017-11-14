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
  this.prevTiem = 0;

  this.setUp();
}

// Creates a LinearAnimation object using Animation Abstract Class
LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.setUp = function() {
  for (let i = 0; i < this.controlPoints.length - 1; ++i) {
    let vec = [];
    vec.push(this.controlPoints[i + 1][0] - this.controlPoints[i][0]);
    vec.push(this.controlPoints[i + 1][1] - this.controlPoints[i][1]);
    vec.push(this.controlPoints[i + 1][2] - this.controlPoints[i][2]);
    this.azimuth.push(Math.atan2(vec[0], vec[2]));
    let ac = Math.sqrt(
      Math.pow(this.controlPoints[i + 1][0] - this.controlPoints[i][0], 2) +
        Math.pow(this.controlPoints[i + 1][2] - this.controlPoints[i][2], 2)
    );
    this.elevation.push(Math.atan2(vec[1], ac));
    this.vx.push(
      this.velocity * Math.cos(this.azimuth[i]) * Math.cos(this.elevation[i])
    );
    this.vy.push(
      this.velocity * Math.sin(this.azimuth[i]) * Math.cos(this.elevation[i])
    );
    this.vz.push(this.velocity * Math.sin(this.elevation[i]));
  }
};

LinearAnimation.prototype.update = function(currTime) {
  var timeinS = 0;
  var timeElapsed = 0;

  //console.log(this.currStep);

  timeElapsed = currTime / 1000 - this.prevTiem;

  this.secondsElapsed = timeinS;
  if (this.currStep >= this.controlPoints.length - 1) {
    return null;
  } else {
    if (this.prevTiem != 0) {
      this.deltaX += timeElapsed * this.vx[this.currStep];
      this.deltaY += timeElapsed * this.vy[this.currStep];
      this.deltaZ += timeElapsed * this.vz[this.currStep];
    }
    //console.log("time elapsed:" + timeElapsed);
    //console.log("dx:" + this.deltaX + " vx:" + this.vx[this.currStep]);
    //console.log("dy:" + this.deltaY + " vy:" + this.vy[this.currStep]);
    //console.log("dz:" + this.deltaZ + " vz:" + this.vz[this.currStep]);

    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, [
      this.deltaX,
      this.deltaY,
      this.deltaZ
    ]);
    console.log(this.matrix);

    let vec = [];
    vec.push(
      this.controlPoints[this.currStep + 1][0] -
        this.controlPoints[this.currStep][0]
    );
    vec.push(
      this.controlPoints[this.currStep + 1][1] -
        this.controlPoints[this.currStep][1]
    );
    vec.push(
      this.controlPoints[this.currStep + 1][2] -
        this.controlPoints[this.currStep][2]
    );

    if (
      this.deltaX >= vec[0] &&
      this.deltaY >= vec[1] &&
      this.deltaZ >= vec[2]
    ) {
      this.currStep++;
    }

    this.prevTiem = currTime / 1000;
  }
};

LinearAnimation.prototype.getMatrix = function() {
  return this.matrix;
};
