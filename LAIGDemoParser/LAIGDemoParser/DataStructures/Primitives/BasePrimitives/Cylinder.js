function Cylinder(Scene,bottom_radius,top_radius,height,sections_along_height,parts_per_section){
    this.scene = Scene;
    this.bottom_radius = bottom_radius;
    this.top_radius = top_radius;
    this.height = height;
    this.slices = sections_along_height;
    this.stacks = parts_per_section;

    CGFobject.call(this,Scene);

    this.setUP();
    this.initBuffers();
}

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.setUP = function(){
    
	var alpha =(2*Math.PI)/this.slices;
	var beta = alpha/2;
	var ind = 0;
	this.vertices =[];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	for(var z = 0; z < this.stacks; z++){
	var sli = z/this.stacks;
	var sliplus1 = sli+1/this.stacks;
		
	for(var i = 0; i < this.slices; i++){
	this.vertices.push(Math.cos(i*alpha)*this.bottom_radius,Math.sin(i*alpha)*this.bottom_radius,sli * this.height);
	this.vertices.push(Math.cos((i+1)*alpha)*this.bottom_radius, Math.sin((i+1)*alpha)*this.bottom_radius,sli * this.height);
	this.vertices.push(Math.cos((i+1)*alpha)*this.bottom_radius, Math.sin((i+1)*alpha)*this.bottom_radius,sliplus1 * this.height);
	this.vertices.push(Math.cos(i*alpha)*this.bottom_radius, Math.sin(i*alpha)*this.bottom_radius,sliplus1 * this.height);

	this.indices.push(ind,ind +1 ,ind + 3);
	this.indices.push(ind+1,ind+2,ind+3);
	this.indices.push(ind+3,ind +1 ,ind);
	this.indices.push(ind+3,ind+2,ind+1);

	this.normals.push(Math.cos(i*alpha),Math.sin(i*alpha),sli);
	this.normals.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sli);
	this.normals.push(Math.cos((i+1)*alpha), Math.sin((i+1)*alpha),sliplus1);
	this.normals.push(Math.cos(i*alpha), Math.sin(i*alpha),sliplus1);
 	ind += 4;
	
	this.texCoords.push(1 - i / this.slices, z / this.stacks);
	this.texCoords.push(1 - (i + 1) / this.slices, z / this.stacks);		
	this.texCoords.push(1 - i / this.slices, (z + 1) / this.stacks);
	this.texCoords.push(1 - (i + 1) / this.slices, (z + 1) / this.stacks);
	}
	}
}

Cylinder.prototype.initBuffers = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}