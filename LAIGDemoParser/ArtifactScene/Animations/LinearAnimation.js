/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(speed, controlPoints) {
  this.matrix = mat4.create();
  this.controlPoints = controlPoints;
  this.Animationlength = 0;
  this.speed = speed;


  this.elevation = [];
  this.currStep = 0;
  this.currStepTotalTime = 0;
  this.currStepTime = 0;
  this.position;
  

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

  this.nextStep();
}

// Creates a LinearAnimation object using Animation Abstract Class
LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.nextStep = function () 
{
    this.currStep++;
   if(this.currStep >= this.controlPoints.length)
        return;
    
   
   this.currStepTime = 0;
   let delta = [];
   for (let i = 0; i < 3; i++)
    delta[i] = this.controlPoints[this.currStep][i] - this.controlPoints[this.currStep - 1][i];
   let sum = 0;
   for (let i = 0; i < 3; i++)
     sum +=delta[i]*delta[i];
   let norma = Math.sqrt(sum);
   this.currStepTotalTime = norma / this.speed;
   this.velocity = [];
   this.velocity[0] = delta[0] / this.currStepTotalTime;
   this.velocity[1] = delta[1] / this.currStepTotalTime;
   this.velocity[2] = delta[2] / this.currStepTotalTime;
   this.position = this.controlPoints[this.currStep - 1].slice();

   var temp_delta = delta;
   temp_delta[1] = 0;
   this.azimuth = Vecs.angleBetweenVecs([1,0,0], temp_delta);
   if (!(this.azimuth == 0 || this.azimuth == (180 * DEGREE_TO_RAD)))
        this.rotateAxis = Vecs.vecCrossProduct([1, 0, 0], temp_delta);
    else
        this.rotateAxis = [0,1,0];
};

LinearAnimation.prototype.update = function (elapsedTimeMS)
{
	if (this.finish == true)
		return;
    let elapsedTimeSec = elapsedTimeMS / 1000;
    this.currStepTime += elapsedTimeSec;
    if(this.currStepTime >= this.currStepTotalTime)
       {
           elapsedTimeSec = this.currStepTime - this.currStepTotalTime; 
           this.nextStep();
       }
     
    if(this.currStep >= this.controlPoints.length)
    {
         this.finish = true;
           return;
    }
    
    let displacement = [];
    displacement[0] = this.velocity[0] * elapsedTimeSec;
    displacement[1] = this.velocity[1] * elapsedTimeSec;
    displacement[2] = this.velocity[2] * elapsedTimeSec;
    
    this.position[0] += displacement[0];
    this.position[1] += displacement[1];
    this.position[2] += displacement[2];
};

LinearAnimation.prototype.applyAnimation = function (matrix)
{
    mat4.translate(matrix, matrix, this.position);
    mat4.rotate(matrix, matrix, this.azimuth, this.rotateAxis);

    this.matrix = matrix;
};

LinearAnimation.prototype.getCopy = function () {
    return new LinearAnimation(this.speed, this.controlPoints.slice());
}

LinearAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}