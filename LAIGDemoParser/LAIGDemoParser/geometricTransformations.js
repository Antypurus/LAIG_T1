
//used to create an array of translation , rotations and scale
function action(){
    action.act = function (object) {}//polymorphic function used to apply the rotation , translation or scale to the object
}


function translation(x=0,y=0,z=0,object){
  action.call(this);

  this.x_translation = x;
  this.y_translation = y;
  this.z_translation = z;

  this.object = object;

  action.act = function (object = this.object) {
    this.object.translate(this.x_translation,this.y_translation,this.z_translation);
  }
}

function rotation(axis,angle,object){
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


function scale(sx=0,sy=0,sz=0,object){
  action.call(this);

  this.x_scalar = sx;
  this.y_scalar = sy;
  this.z_scalar = sz;

  this.object = object;

  action.act = function (object = this.object) {
    this.object.scale(this.x_scalar,this.y_scalar,this.z_scalar);
  }
}
