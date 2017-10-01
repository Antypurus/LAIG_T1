function Square(Scene,Coord1,Coord2){
  this.scene = Scene;
  this.coord1 = Coord1;
  this.coord2 = Coord2;

  CGFobject.call(this,Scene);
}

Square.prototype = Object.create(CGFobject.prototype);
