/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(velocity, controlPoints)
{
    this.matrix = mat4.create();
    this.controlPoints = controlPoints;
    this.Animationlength = 0;
    this.velocity = velocity;
    this.startingPos = this.controlPoints[0];
    var deltaZ = this.controlPoints[1][2] - this.controlPoints[0][2];
    var deltaX = this.controlPoints[1][0] - this.controlPoints[0][0];
    this.angle = Math.atan2(deltaZ, deltaX);
    this.twoPointsFinish = new Array(); //distance between two points to know when to stop while travelling between those two
    

    //calculating the distance between one point and the next in the controlpoint array
    for(var i = 0; i < this.controlPoints.length - 1; i++)
    {
        var lengthtwopoints = this.twoPointsLength(this.controlPoints[i], this.controlPoints[i + 1]);
        this.Animationlength += lengthtwopoints;
        this.twoPointsFinish.push(lengthtwopoints);
    }

    this.position = null;
    this.secondsElapsed = 0;
    this.distanceElapsed = 0; //if this is equal to animationLenght it stops
    this.nControlpoints  = 0; //this variable identifies the numbers of lines between control points the object has already passed
    this.finish = false; //if true animation stops
}

//Creates a LinearAnimation object using Animation Abstract Class
LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function(currTime) 
{
    var timeinS = 0;
    var timeElapsed = 0;
    var distanceTranslate = 0;
    
    timeinS = currTime/1000;

    if(this.secondsElapsed > 0)
        timeElapsed = timeinS - this.secondsElapsed;
    
    this.secondsElapsed = timeinS;

    this.distanceElapsed += this.velocity * timeElapsed;

    if(this.distanceElapsed > this.twoPointsFinish[this.nControlpoints])
    {
        //if the number of lines passed is equal to the total amount of lines - 1 it stops
        if(this.nControlpoints  == (this.twoPointsFinish.length - 1))
        {
            //mat4.translate(this.matrix, this.matrix, this.controlPoints[this.controlPoints.length - 1]);
            //mat4.rotate(this.matrix, this.matrix,this.angle, [0, 1, 0]);
            this.finish = true;
                return;
        }
        else
        {
            this.distanceElapsed = 0;
            this.nControlpoints++;
        }
    }

    distanceTranslate = this.distanceElapsed / this.twoPointsFinish[this.nControlpoints];

    this.Position = new position(
        (distanceTranslate * this.controlPoints[(this.nControlpoints+1)][0]),
        (distanceTranslate * this.controlPoints[(this.nControlpoints+1)][1]),
        (distanceTranslate * this.controlPoints[(this.nControlpoints+1)][2]));

    this.angle = Math.atan2(
    (this.controlPoints[this.nControlpoints][0] - this.controlPoints[(this.nControlpoints + 1)][0]),
    (this.controlPoints[this.nControlpoints][2] - this.controlPoints[(this.nControlpoints + 1)][2])
  );

    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix,[this.Position.x, this.Position.y, this.Position.z]);
    mat4.rotate(this.matrix, this.matrix,this.angle, [0, 1, 0]);
    
}

LinearAnimation.prototype.twoPointsLength = function(P1,P2)
{
    var p1 = new position(P1[0], P1[1], P1[2]);
    var p2 = new position(P2[0], P2[1], P2[2]);

    return Math.sqrt
    (
        Math.pow(p1.x - p2.x, 2 ) +
		Math.pow(p1.y - p2.y, 2 ) +
		Math.pow(p1.z - p2.z, 2 )
    );
}

LinearAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}