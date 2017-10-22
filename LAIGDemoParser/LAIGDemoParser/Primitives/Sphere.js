function Sphere(Scene,radius,parts_along_radius,parts_per_section){
    this.scene = Scene;

	if(parts_along_radius < 3)
		{
			this.stacks = 3
			console.log("Sphere stack value error, needs to be at least 3, set to default value")
		}
	else
	this.stacks = parts_along_radius;

	if(parts_per_section < 6)
		{
			this.slices = 6;
			console.log("Sphere slice value error, needs to be at least 6, set to default value")
		}
	else
	this.slices = parts_per_section;
	
    this.radius = radius;

    CGFobject.call(this,Scene);
    this.initBuffers();
}

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;


Sphere.prototype.initBuffers = function(){
    var slicesCoord = 1/this.slices;
	var stacksCoord = 1/this.stacks;
	var beta  = (2*Math.PI)/this.slices;
	var alpha = (Math.PI/2)/this.stacks;
	
	this.vertices  = [];
	this.indices   = [];
	this.normals   = [];
	this.texCoords = [];
	
	for(var z = 0; z <= this.stacks; z++)
	{
		for(var i = 0; i <= this.slices; i++)
		{
			this.vertices.push(Math.cos(z*alpha)*Math.cos(i*beta)*this.radius, Math.cos(z*alpha)*Math.sin(i*beta)*this.radius, Math.sin(z*alpha)*this.radius);
			this.normals.push(Math.cos(z*alpha)*Math.cos(i*beta)*this.radius, Math.cos(z*alpha)*Math.sin(i*beta)*this.radius, Math.sin(z*alpha)*this.radius);
		}
	}

		for(var z = 0; z < this.stacks; z++)
	{
		for (var i = 0; i < this.slices; i++)
		{
			this.indices.push( z * (this.slices +1) + i, z * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i );
			this.indices.push( z * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i + 1, (z + 1) * (this.slices +1) + i );
		}
	}

			for(var t = 0; t <= this.stacks; t++)
	{
		for(var s = 0; s <= this.slices; s++)
		{
			this.texCoords.push(slicesCoord * s, stacksCoord * t);
		}
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}

Sphere.prototype.display = function()
{
    this.scene.pushMatrix();
	CGFobject.prototype.display.call(this);
	this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180 *  Math.PI / 180, 0,1,0);
    CGFobject.prototype.display.call(this);
    this.scene.popMatrix();

}