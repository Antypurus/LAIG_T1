function Triangle(CGFScene){
    this.scene = CGFScene

    this.transforms = [];

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

Triangle.prototype.setTransforms = function(transforms){
    this.transforms = transforms;
}

Triangle.prototype.addTransform = function(transform){
    this.transforms.push(transform);
}

Triangle.prototype.removeTransform = function(index){
    this.transforms.splice(index,1);
}

Triangle.prototype.initBuffers = function(){
    
    this.scene.pushMatrix();
    for(var i =0;i<this.transforms.length;i++){
        this.transforms[i].act(this);//tentative
    }
    this.scene.popMatrix();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}