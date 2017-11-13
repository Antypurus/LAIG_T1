/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(id, velocity, controlPoints)
{
    Animation.call(this,id); //calling abstract methods

    this.id = id;
    this.controlPoints = controlPoints;
    this.Animationlength = 0;
    this.velocity = velocity;
    this.startingPos = this.controlPoints[0];
    var deltaZ = this.controlPoints[1].z - this.controlPoints[0].z;
    var deltaX = this.controlPoints[1].x - this.controlPoints[0].x;
    this.angle = Math.atan2(deltaZ, deltaX);
    this.twoPointsFinish = new Array(); //distance between two points to know when to stop while travelling between those two
    

    //calculating the distance between one point and the next in the controlpoint array
    for(var i = 0; i < this.controlPoints.length - 1; i++)
    {
        var lengthtwopoints = this.twoPointsLength(this.controlPoints[i], this.controlPoints[i + 1]);
        this.Animationlength += lengthtwopoints;
        this.twoPointsFinish.push(lengthtwopoints);
    }

    this.position = NULL;
    this.secondsElapsed = 0;
    this.distanceElapsed = 0; //if this is equal to animationLenght it stops
    this.nControlpoints  = 0; //this variable identifies the numbers of lines between control points the object has already passed
    this.finish = false; //if true animation stops
}

//Creates a LinearAnimation object using Animation Abstract Class
LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function(currTime) 
{
    var timeinS = 0;
    var timeElapsed = 0;
    
    timeinS = currTime/1000;

    if(this.secondsElapsed > 0)
        timeElapsed = timeinS - this.secondsElapsed;
    
    this.secondsElapsed = timeinS;

    this.distanceElapsed += timeElapsed * this.velocity;

    if(this.distanceElapsed > this.twoPointsFinish[this.nControlpoints])
    {
        //if the number of lines passed is equal to the total amount of lines - 1 it stops
        if(this.nControlpoints  == (this.twoPointsFinish.length - 1))
        {
                this.finish = true;
                return;
        }
        else
        {
            this.distanceElapsed = 0;
            this.nControlpoints ++;
            this.angle = Math.atan2(
                (this.controlPoints[(this.nControlpoints + 1)].x - this.controlPoints[this.nControlpoints].x),
                (this.controlPoints[(this.nControlpoints + 1)].z - this.controlPoints[this.nControlpoints].z)
              );
        }
    }

    var distanceTranslate = this.distanceElapsed / this.twoPointsFinish[this.nControlpoints];

    {
    this.position = new Position(
        (increment * this.controlPoints[(this.nControlpoints+1)].x) + ((1-increment)*this.controlPoints[this.nControlpoints].x),
        (increment * this.controlPoints[(this.nControlpoints+1)].y) + ((1-increment)*this.controlPoints[this.nControlpoints].y),
        (increment * this.controlPoints[(this.nControlpoints+1)].z) + ((1-increment)*this.controlPoints[this.nControlpoints].z));
    }


    var deltaX = 0;
    var deltaY = 0;
    var deltaz = 0;

    if (this.object != null) {
        deltaX = this.position.x - this.object.vertices[0];
        deltaY = this.position.y - this.object.vertices[1];
        deltaZ = this.position.z - this.object.vertices[2];

        this.object.scene.translate(deltaX,deltaY,deltaZ);
    }

    
}

LinearAnimation.prototype.twoPointsLength = function(P1,P2)
{
    return Math.sqrt
    (
        Math.pow(this.P1.x - this.P2.x, 2 ) +
		Math.pow(this.P1.y - this.P2.y, 2 ) +
		Math.pow(this.P1.z - this.P2.z, 2 )
    );
};