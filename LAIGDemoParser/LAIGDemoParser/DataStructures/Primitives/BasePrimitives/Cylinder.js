function Cylinder(Scene,bottom_radius,top_radius,height,sections_along_height,parts_per_section){
    this.scene = Scene;
    this.bottom_radius = bottom_radius;
    this.top_radius = top_radius;
    this.height = height;
    this.sections_along_height = sections_along_height;
    this.parts_per_section = parts_per_section;

    CGFobject.call(this,scene);

    this.setUP();
    this.initBuffers();
}

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.setUP = function(){
    //calc vertices and indices
}

Cylinder.prototype.initBuffers = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}