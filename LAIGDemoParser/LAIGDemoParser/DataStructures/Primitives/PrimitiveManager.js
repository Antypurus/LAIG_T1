function PrimitiveManager(Scene){

  this.scene = Scene;
  this.triangles = new Map();
  this.rectangles = new Map();
  this.spheres = new Map();
  this.cylinders = new Map();

}

PrimitiveManager.prototype.addTriangle(id,Coord1,Coord2,Coord3){
  if(this.triangles.has(id)){
    return false;
  }else{
    this.triangles.set(id,new Triangle(this.scene,Coord1,Coord2,Coord3));
    return true;
  }
  return false;
}

PrimitiveManager.prototype.addSquare(id,Coord1,Coord2){
  if(this.rectangles.has(id)){
    return false;
  }else{
    this.rectangles.set(id,new Square(this.scene,Coord1,Coord2));
    return true;
  }
  return false;
}
