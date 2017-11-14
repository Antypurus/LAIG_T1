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

	this.initialOrientation = [-1,0,0];

	this.velocityVector = [];

    this.p1 = [];
	this.p2 = [];
	this.p3 = [];
	this.p4 = [];

}

BezierAnimation.prototype = Object.create(CGFobject.prototype);
BezierAnimation.prototype.constructor = CircularAnimation;

BezierAnimation.prototype.bezierCalculation = function(currTime) 
{
    this.p1 =
    [
    this.controlPoints[0][0],
    this.controlPoints[0][1],
    this.controlPoints[0][2] 
    ];

    this.p4 = [
        this.controlPoints[3][0], // para atingir o centro do alvo
        this.controlPoints[3][1],
        this.controlPoints[3][2] 
        ];

    for(var i = 0; i < this.p4.length && i < this.p1.length;i++)
    {
        this.vector[i] = this.p4[i] - this.p1[i];
    }

    this.p2 = 
        [
        this.controlPoints[1][0],
        this.controlPoints[1][1],
        this.controlPoints[1][2]
        ];

    this.p3 = 
        [
        this.controlPoints[2][0], // para atingir o centro do alvo
        this.controlPoints[2][1],
        this.controlPoints[2][2] 
        ];


    this.distance = Math.sqrt(Math.pow(this.vector[0],2) + Math.pow(this.vector[1],2) + Math.pow(this.vector[2],2));

    this.animationTime = Math.round(this.distance);   

    this.destroyTarget = true;
}

BezierAnimation.prototype.update = function(currTime) 
{
  

	this.crossProductResult = 
	[ this.initialOrientation[1] * this.velocityVector[2] - this.initialOrientation[2] * this.velocityVector[1]
	, this.initialOrientation[2] * this.velocityVector[0] - this.initialOrientation[0] * this.velocityVector[2]
	, this.initialOrientation[0] * this.velocityVector[1] - this.initialOrientation[1] * this.velocityVector[0]];
	
	this.calculateRotatingAngle(this.initialOrientation, this.velocityVector);

    mat4.rotate(this.matrix, this.matrix, (this.anglezxy, [this.crossProductResult[0], this.crossProductResult[1],this.crossProductResult[2]])); //para fazer rotate e preciso primeiro por em rad

	//this.scene.rotate(this.anglezxy, this.crossProductResult[0], this.crossProductResult[1],this.crossProductResult[2]);
}

BezierAnimation.prototype.calculateRotatingAngle = function(vector1, vector2)
{
	this.magnitude = Math.sqrt(Math.pow(vector1[0],2) + Math.pow(vector1[1],2) + Math.pow(vector2[2],2));

	this.magnitude2 = Math.sqrt(Math.pow(vector2[0],2) + Math.pow(vector2[1],2) + Math.pow(vector2[2],2));

	this.dotProductResult = vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];

	this.anglezxy = Math.acos(this.dotProductResult / (this.magnitude * this.magnitude2));
}

BezierAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}