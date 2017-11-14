/**
 * CircularAnimation
 * @constructor
 */

function CircularAnimation(center, radius, startang,rotang, velocity)
{
    this.matrix = mat4.create();
    this.Animationlength = 0;

    this.center = center;
    this.radius = radius;
    this.velocity = velocity;
    this.startang = startang;
    this.rotang = rotang;

    this.firstTime = true;
	this.time = null;
	this.currTime = null;
	this.finish = false;

	this.lastAng = this.startang + this.rotang; //last angle é igual ao angulo inicial mais o angulo de rotacao
	this.curr_ang = this.startang; //o angulo atual é o startang no inicio
}

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function(currTime) 
{
	this.currTime = currTime/1000;
	
	if(this.curr_ang <= this.lastAng){

		if(this.firstTime)
		{
			this.firstTime = false;
			this.time = this.currTime; //guardar o tempo em que começa a andar
			this.current_time = this.currTime; //variavel que vai ser usada para manter a mesma velocidade
		}
		else{ // depois de fazer a primeira vez só precisa de atualizar o tempo atual
			this.current_time = this.currTime;
		}
		this.curr_ang = this.startang + (this.velocity * (this.current_time - this.time));
		mat4.identity(this.matrix);

		mat4.translate(this.matrix, this.matrix,[this.center.x, this.center.y, this.center.z]); //translate para o centro
		mat4.rotate(this.matrix, this.matrix, (this.curr_ang*Math.PI)/180.0, [0,1,0]); //para fazer rotate e preciso primeiro por em rad
		mat4.translate(this.matrix, this.matrix,[this.radius,0,0]); //para fazer o moviment circular é preciso ir fazendo translate de raio
	}
	else{
		this.finish = true; // stop animation
	}
}

CircularAnimation.prototype.getMatrix = function()
{
    return this.matrix;
}