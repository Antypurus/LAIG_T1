
//primitive constructor
function primitive(type,vertices,id,scene){
  CGFobject.call(this,scene);

  this.id = id;
  this.type = type;
  this.vertices = vertices;
  this.inidices = null;
  this.transforms = null;
  this.scene = scene;
  //this.setUP();
  //this.initBuffers();
}

primitive.prototype = Object.create(CGFobject.prototype);
primitive.prototype.constructor = primitive;

primitive.prototype.setUP = function(){
  for(var i = 0;i<this.vertices.length;++i){
    
    if(i%2==0){
      this.inidices.push(i);
    }
  }
}

primitive.prototype.setTransforms = function(transforms){
  this.transforms = transforms;
}

primitive.prototype.addTransform = function(transform){
  this.transforms.push(transform);
}

primitive.prototype.removeTransform = function(index){
  this.transforms.splice(index,1);
}

primitive.prototype.initBuffers = function() {
  this.pushMatrix();
  for(var i=0;i<this.transforms.length();++i){
    this.transforms[i].act(this);
  }
  this.popMatrix();

  this.initGLBuffers();
}

function triangle(id,scene){
  var vertices = [
    0,0,0,
    2,0,0,
    1,2,0
   ];

   var indices = [
     0,1,2,
     2,1,0
   ]

   primitive.call(this,"triangle",vertices,id,scene);
   this.indices = indices;

   this.initBuffers();
}