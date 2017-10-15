function Rectangle(Scene,Coord1,Coord2){
  this.scene = Scene;
  this.coord1 = Coord1;
  this.coord2 = Coord2;

  this.setUP();

  CGFobject.call(this,Scene);
  this.initBuffers();
}

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.setUP = function(){
  this.vertices = [
    this.coord2.x,this.coord1.y,0,
    this.coord1.x,this.coord1.y,0,
    this.coord2.x,this.coord2.y,0,
    this.coord1.x,this.coord2.y,0
  ];

  this.indices = [
    0,1,2,
    1,3,2
  ];

 	this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
 	];

 	 this.texCoords = 
 	 [ 0,0,
 	    Math.abs(this.vertices[0] - this.vertices[2]),0,
 	    0,Math.abs(this.vertices[1] - this.vertices[3]),
 	     Math.abs(this.vertices[0] - this.vertices[2]),Math.abs(this.vertices[1] - this.vertices[3])
    ];

}

Rectangle.prototype.initBuffers = function(){
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
}

Rectangle.prototype.setAmplifFactor = function(amplif_s, amplif_t)
{
	var dist_s = Math.abs(this.vertices[0] - this.vertices[2]);
	var dist_t = Math.abs(this.vertices[1] - this.vertices[3]); 
	this.texCoords.push(
		dist_s/amplif_s, 1 - dist_t/amplif_t,
		0, 1 - dist_t/amplif_t,
		dist_s/amplif_s, 1,
		0, 1
	);


	this.updateTexCoordsGLBuffers();

}