
/*
Constructor for a generic primitive
@constructor
*/
function primitive(type,vertices,id,scene){
  CGFobject.call(this,scene);

  this.id = id;
  this.type = type;
  this.vertices = vertices;
  this.indices = null;
  this.scene = scene;
  this.setUP();
  this.initBuffers();
}

primitive.prototype = Object.create(CGFobject.prototype);
primitive.prototype.constructor = primitive;

primitive.prototype.setUP = function(){
  for(var i = 0;i<this.vertices.length;++i){

    if(i%2==0){
      this.indices.push(i);
    }
  }
}

primitive.prototype.initBuffers = function() {
  this.initGLBuffers();
  return;
}
