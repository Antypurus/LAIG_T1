function Frog(Scene){
  this.scene = Scene;

  this.setUP();

  CGFobject.call(this,Scene);
  this.initBuffers();
}

Frog.prototype = Object.create(CGFobject.prototype);
Frog.prototype.constructor = Frog;

Frog.prototype.setUP = function() {
    this.vertices = [

    ];

    this.indices = [

    ];

};

Frog.prototype.initBuffers = function() {
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};