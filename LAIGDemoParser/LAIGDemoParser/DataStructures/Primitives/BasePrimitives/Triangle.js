function Triangle(CGFScene){
    this.scene = CGFScene

    this.vertices = [
        0,0,0,
        2,0,0,
        1,2,0
    ];

    this.indices = [
        0,1,2
    ];

    CGFobject.call(this,CGFScene);
    this.initBuffers();
}

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
