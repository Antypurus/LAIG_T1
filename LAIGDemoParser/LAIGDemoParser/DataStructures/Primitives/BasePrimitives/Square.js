function Square(Scene,Coord1,Coord2){
  this.scene = Scene;
  this.coord1 = Coord1;
  this.coord2 = Coord2;

  this.setUP();

  CGFobject.call(this,Scene);
  this.initBuffers();
}

Square.prototype = Object.create(CGFobject.prototype);
Square.prototype.constructor = Square;

Square.prototype.setUP = function(){
  this.vertices = [
    this.coord1.x,this.coord1.y,0,
    this.coord2.x,this.coord1.y,0,
    this.coord2.x,this.coord2.y,0,
    this.coord1.x,this.coord2.y,0
  ];

  this.indices = [
    0,1,2,
    0,2,3
  ];
}

Square.prototype.initBuffers = function(){
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
}
