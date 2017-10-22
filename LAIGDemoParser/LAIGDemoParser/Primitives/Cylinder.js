function Cylinder(Scene, height, bottom_radius, top_radius, sections_along_height, parts_per_section, topcap, bottomcap) {
	this.scene = Scene;
	this.bottom_radius = bottom_radius;
	this.top_radius = top_radius;
	this.height = height;
	if(sections_along_height < 1)
		{
			this.stacks = 1
			console.log("Cylinder stack value error, needs to be at least 1, set to default value")
		}
	else
	this.stacks = sections_along_height;

	if(parts_per_section < 3)
		{
			this.slices = 3;
			console.log("Cylinder slice value error, needs to be at least 3, set to default value")
		}
	else
	this.slices = parts_per_section;
	
	this.topcap = topcap;
	this.bottomcap = bottomcap;
	this.circle = new Circle(Scene, this.stacks, 1);

	CGFobject.call(this, Scene);

	this.setUP();
	this.initBuffers();
}

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.setUP = function () {

	var deltaR=this.top_radius-this.bottom_radius;
	var dr=deltaR/this.stacks;

	var alpha = (2 * Math.PI) / this.slices;
	var beta = alpha / 2;
	var ind = 0;
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var topRad=0;
	var botRad=0;

	for (var z = 0; z < this.stacks; z++) {
		var sli = z / this.stacks;
		var sliplus1 = sli + 1 / this.stacks;

		if(z==0){
			botRad=this.bottom_radius;
			topRad=botRad+dr;
		}else{
			botRad+=dr;
			topRad=botRad+dr;
		}

		for (var i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(i * alpha) * botRad, Math.sin(i * alpha) * botRad, sli * this.height);
			this.vertices.push(Math.cos((i + 1) * alpha) * botRad, Math.sin((i + 1) * alpha) * botRad, sli * this.height);
			this.vertices.push(Math.cos((i + 1) * alpha) * topRad, Math.sin((i + 1) * alpha) * topRad, sliplus1 * this.height);
			this.vertices.push(Math.cos(i * alpha) * topRad, Math.sin(i * alpha) * topRad, sliplus1 * this.height);

			this.indices.push(ind, ind + 1, ind + 3);
			this.indices.push(ind + 1, ind + 2, ind + 3);
			this.indices.push(ind + 3, ind + 1, ind);
			this.indices.push(ind + 3, ind + 2, ind + 1);

			this.normals.push(Math.cos(i * alpha), Math.sin(i * alpha), sli);
			this.normals.push(Math.cos((i + 1) * alpha), Math.sin((i + 1) * alpha), sli);
			this.normals.push(Math.cos((i + 1) * alpha), Math.sin((i + 1) * alpha), sliplus1);
			this.normals.push(Math.cos(i * alpha), Math.sin(i * alpha), sliplus1);
			ind += 4;

			this.texCoords.push(1 - i / this.slices, z / this.stacks);
			this.texCoords.push(1 - (i + 1) / this.slices, z / this.stacks);
			this.texCoords.push(1 - (i + 1) / this.slices, (z + 1) / this.stacks);
			this.texCoords.push(1 - i / this.slices, (z + 1) / this.stacks);
		}
	}

}

Cylinder.prototype.initBuffers = function () {
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
}

Cylinder.prototype.display = function () {
	if(this.bottomcap)
	{
	this.scene.pushMatrix();
	this.scene.scale(this.bottom_radius,this.bottom_radius,1);
	this.circle.display();
	this.scene.popMatrix();
	}

	if(this.topcap)
	{
	this.scene.pushMatrix();
	this.scene.scale(this.top_radius,this.top_radius,1);
	this.scene.translate(0, 0, this.height);
	this.circle.display();
	this.scene.popMatrix();
	}

	this.scene.pushMatrix();
	CGFobject.prototype.display.call(this);
	this.scene.popMatrix();
}