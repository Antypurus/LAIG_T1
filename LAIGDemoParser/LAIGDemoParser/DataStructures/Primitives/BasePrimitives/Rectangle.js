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
    this.coord1.x,this.coord1.y,0,
    this.coord2.x,this.coord1.y,0,
    this.coord2.x,this.coord2.y,0,
    this.coord1.x,this.coord2.y,0
  ];

  this.indices = [
    0,2,1,
    3,2,0
  ];

 	this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
 	];

 	 this.texCoords = [
        0,0,
        0,1,
        1,1,
        1,0
    ];

}

Rectangle.prototype.initBuffers = function(){
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
}
