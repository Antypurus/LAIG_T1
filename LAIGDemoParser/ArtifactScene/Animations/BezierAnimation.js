/**
 * BezierAnimation
 * @constructor
 */

function BezierAnimation(velocity, controlPoints)
{
    this.matrix = mat4.create();
    this.velocity = velocity;
    this.controlPoints = controlPoints;

	this.anglezxy = 0;
	this.angley = 0;
	this.vector = [];
	this.angleVector = [];
	this.distance = 0;
	this.magnitude = 0;
	this.magnitude2 = 0;
	this.dotProductResult = 0;
	this.crossProductResult = [];
	this.firstTime = true;

	this.initialOrientation = [-1,0,0];
	this.t = 0;

	this.velocityVector = [];

    this.p1 = [];
	this.p2 = [];
	this.p3 = [];
	this.p4 = [];

	this.xPos  = this.controlPoints[0][0];
	this.yPos  = this.controlPoints[0][1];
	this.zPos  = this.controlPoints[0][2];

}

BezierAnimation.prototype = Object.create(CGFobject.prototype);
BezierAnimation.prototype.constructor = CircularAnimation;

BezierAnimation.prototype.BezierLength = function() 
{
	var BEZIER_STEPS = 10;
    var t = 0.0
      , dot_x = 0.0
      , dot_y = 0.0
      , dot_z = 0.0
      , previous_dot_x = 0.0
      , previous_dot_y = 0.0
      , previous_dot_z = 0.0
      , length = 0.0;
    steps = BEZIER_STEPS;

    for (let i = 0; i <= steps; i++) 
    {
        t = i / steps;
        dot_x = this.BezierPoint(t, this.p1[0], this.p2[0], this.p3[0], this.p4[0]);
        dot_y = this.BezierPoint(t, this.p1[1], this.p2[1], this.p3[1], this.p4[1]);
        dot_z = this.BezierPoint(t, this.p1[2], this.p2[2], this.p3[2], this.p4[2]);
        if (i > 0) 
        {
            var x_diff = dot_x - previous_dot_x;
            var y_diff = dot_y - previous_dot_y;
            var z_diff = dot_z - previous_dot_z;
            length += Math.sqrt(x_diff * x_diff + y_diff * y_diff + z_diff * z_diff);
        }

        previous_dot_x = dot_x;
        previous_dot_y = dot_y;
        previous_dot_z = dot_z;
    }

    return length;
}


BezierAnimation.prototype.BezierPoint = function(t, P1, P2, P3, P4) 
{
    var bezier_point = P1 * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * P2 * (1.0 - t) * (1.0 - t) * t + 3.0 * P3 * (1.0 - t) * t * t + P4 * t * t * t;

    return bezier_point;
}

BezierAnimation.prototype.bezierCalculation = function() 
{
    this.p1 = this.controlPoints[0];

    this.p4 = this.controlPoints[3];

    for(var i = 0; i < this.p4.length && i < this.p1.length;i++)
    {
        this.vector[i] = this.p4[i] - this.p1[i];
    }

    this.p2 = this.controlPoints[1];

    this.p3 = this.controlPoints[2];


    this.distance = this.BezierLength();

    this.animationTime = Math.round(this.distance);   

    this.destroyTarget = true;
}


BezierAnimation.prototype.update = function(currTime) 
{
	this.bezierCalculation();
		this.currTime = currTime/1000;

		if(this.firstTime)
		{
			this.firstTime = false;
			this.time = this.currTime; //guardar o tempo em que começa a andar
			this.current_time = this.currTime; //variavel que vai ser usada para manter a mesma velocidade
		}
		else{ // depois de fazer a primeira vez só precisa de atualizar o tempo atual
			this.current_time = this.currTime;
		}

		var dist = this.BezierLength(); 
		var delta = dist/this.velocity ;
		

        if(this.t <= 1){

        	var xPos = this.xPos;
        	var yPos = this.yPos;
        	var zPos = this.zPos;

            var t = this.t;

            this.xPos = Math.pow((1-t), 3) * this.p1[0] + 3*Math.pow((1-t), 2) * t * this.p2[0] + 3*(1-t) * Math.pow(t, 2) * this.p3[0] + Math.pow(t, 3) * this.p4[0]; 

            this.yPos = Math.pow((1-t), 3) * this.p1[1] + 3*Math.pow((1-t), 2) * t * this.p2[1] + 3*(1-t) * Math.pow(t, 2) * this.p3[1] + Math.pow(t, 3) * this.p4[1]; 

            this.zPos = Math.pow((1-t), 3) * this.p1[2] + 3*Math.pow((1-t), 2) * t * this.p2[2] + 3*(1-t) * Math.pow(t, 2) * this.p3[2] + Math.pow(t, 3) * this.p4[2]; 

            

            this.translationVector = 
            [
				this.xPos,
				this.yPos,
				this.zPos
    		];


    		this.t += (this.current_time - this.time)/(this.animationTime);

        }
	
}

BezierAnimation.prototype.applyAnimation = function()
{
    	mat4.identity(this.matrix);
    	mat4.translate(this.matrix, this.matrix,this.translationVector);
		return this.matrix;
}

BezierAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}