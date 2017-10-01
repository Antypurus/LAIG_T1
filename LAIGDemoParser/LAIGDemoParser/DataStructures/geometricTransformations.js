
//used to create an array of translation , rotations and scale
function action(){
    action.act = function (object) {}//polymorphic function used to apply the rotation , translation or scale to the object
}


function Translation(x=0,y=0,z=0,object){
  
  this.x_translation = x;
  this.y_translation = y;
  this.z_translation = z;
  
  this.object = object;
  
  action.call(this);
  action.act = function (object = this.object) {
    this.object.translate(this.x_translation,this.y_translation,this.z_translation);
  }
}

Translation.prototype = Object.create(action.prototype);
Translation.prototype.constructor = Translation;

function Rotation(axis,angle,object){
  action.call(this);

  this.anlge = angle
  this.axis = axis;
  this.object = object;

  action.act = function (object = this.object) {

    switch(axis){

      case("x"):this.object.rotate(this.angle,0,0);
      case("y"):this.object.rotate(0,this.angle,0);
      case("z"):this.object.rotate(0,0,this.angle);

    }

  }
}

Rotation.prototype = Object.create(action.prototype);
Rotation.prototype.constructor = Rotation;

function Scale(sx=0,sy=0,sz=0,object){
  
  this.x_scalar = sx;
  this.y_scalar = sy;
  this.z_scalar = sz;
  
  this.object = object;
  
  action.call(this);
  action.act = function (object = this.object) {
    this.object.scale(this.x_scalar,this.y_scalar,this.z_scalar);
  }
}

Scale.prototype = Object.create(action.prototype);
Scale.prototype.constructor = Scale;
