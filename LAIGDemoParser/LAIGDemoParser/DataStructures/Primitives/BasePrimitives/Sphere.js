function Sphere(Scene,radiu,parts_along_radius,parts_per_section){
    this.scene = Scene;
    this.parts_along_radius = parts_along_radius;
    this.parts_per_section = parts_per_section;

    CGFobject.call(this.scene);
    this.setUP();
    this.initBuffers();
}

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

Sphere.prototype.setUP = function(){
    //calc vertices and indices
}

Sphere.prototype.initBuffers = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}