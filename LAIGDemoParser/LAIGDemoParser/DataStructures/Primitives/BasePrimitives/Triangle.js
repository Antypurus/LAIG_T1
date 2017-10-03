function Triangle(CGFScene,coord1,coord2,coord3){
    this.scene = CGFScene

    this.coord1 = coord1;
    this.coord2 = coord2;
    this.coord3 = coord3;
    this.setUP();

    CGFobject.call(this,CGFScene);
    this.initBuffers();
}

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.setUP = function(){

  this.vertices_s = [
    this.coord1.x,this.coord1.y,this.coord1.z,
    this.coord2.x,this.coord2.y,this.coord2.z,
    this.coord3.x,this.coord3.y,this.coord3.z
  ];

  this.indices_s = [
    0,1,2,
  ];

}

Triangle.prototype.initBuffers = function(){
    this.vertices = this.vertices_s;
    this.indices = this.indices_s;

    this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
 	];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
