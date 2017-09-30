
//primitive constructor
function primitive(type,vertices,id,scene){
  CGFobject.call(this,scene);

  this.id = id;
  this.type = type;
  this.vertices = vertices;
  this.inidices = null;

  this.scene = scene;
  this.initBuffers();//testing
}

primitive.prototype = Object.create(CGFobject.prototype);
primitive.prototype.constructor = primitive;

primitive.prototype.initBuffers = function() {

  for(var i = 0;i<this.vertices.length;++i){
    if(i%2==0){
      this.inidices.push(i);
    }
  }

  this.initGLBuffers();
}
