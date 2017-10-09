function Sphere(Scene,radius,parts_along_radius,parts_per_section){
    this.scene = Scene;
    this.slices = parts_along_radius;
    this.stacks = parts_per_section;
    this.radius = radius;


    this.semisphere1 = new SemiSphere(this.scene,this.radius, this.slices, this.stacks);

    CGFobject.call(this,Scene);
}

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

Sphere.prototype.display = function(){

    this.scene.pushMatrix();
    this.semisphere1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180 *  Math.PI / 180, 0,1,0);
    this.semisphere1.display();
    this.scene.popMatrix();
}
