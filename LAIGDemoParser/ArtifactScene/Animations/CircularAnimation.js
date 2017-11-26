/**
 * CircularAnimation
 * @constructor
 */

function CircularAnimation(center, radius, startang,rotang, velocity)
{
    //this.matrix = mat4.create();
    //this.Animationlength = 0;

	
    this.center = center;
    this.radius = radius;
    this.startang2 = startang;
    this.rotang2 = rotang;
    this.velocity2 = velocity;
    this.startang = startang * (Math.PI/180);
    this.rotang = rotang * (Math.PI/180);
    let aux = velocity/radius;
    this.velocity = aux;
    if (this.rotang < 0)
    this.velocity = -this.velocity;

    this.currTime = 0;
    this.firstTime = true;
	this.time = null;
    this.finish = false;
    this.totalTime = Math.abs(this.rotang / this.velocity);

	this.lastAng = this.startang + this.rotang; //last angle é igual ao angulo inicial mais o angulo de rotacao
	this.curr_ang = this.startang; //o angulo atual é o startang no inicio
}

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function(currTime) 
{
	if(this.finish)
		{
			this.curr_ang = this.startang + (this.velocity * this.totalTime);
		}
		
    this.currTime += currTime/1000;

	
    if (this.currTime <= this.totalTime)
    {
        this.curr_ang = this.startang + (this.velocity * this.currTime);
    }
    else
    {
		this.finish = true; // stop animation
	}
}

CircularAnimation.prototype.applyAnimation = function(matrix)
{
    mat4.translate(matrix, matrix,[this.center.x, this.center.y, this.center.z]); //translate para o centro
	mat4.rotate(matrix, matrix, this.curr_ang, [0,1,0]); //para fazer rotate e preciso primeiro por em rad
	mat4.translate(matrix, matrix,[0,0,this.radius]); //para fazer o moviment circular é preciso ir fazendo translate de raio
	matrix = this.matrix;
}

CircularAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}

CircularAnimation.prototype.getCopy = function () {
    return new CircularAnimation(this.center, this.radius, this.startang2, this.rotang2, this.velocity2);
}
