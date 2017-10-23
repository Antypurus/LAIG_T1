function Triangle(Scene,coord1,coord2,coord3){
    this.scene = Scene;

    this.coord1 = coord1;
    this.coord2 = coord2;
    this.coord3 = coord3;
    this.setUP();

    CGFobject.call(this,Scene);
    this.initBuffers();
}

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.setUP = function(){

  this.vertices = [
    this.coord1.x,this.coord1.y,this.coord1.z,
    this.coord2.x,this.coord2.y,this.coord2.z,
    this.coord3.x,this.coord3.y,this.coord3.z
  ];

  this.indices = [
    0,1,2,
  ];

      this.normals = [
    		0, 1, 0,
    		0, 1, 0,
    		0, 1, 0
    	];

    	this.texCoords = [];
}

Triangle.prototype.initBuffers = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

Triangle.prototype.ScaleTexCoords = function (ampS, ampT) {

    //P0 coords
    var x1 = this.vertices[0];
    var y1 = this.vertices[1];
    var z1 = this.vertices[2];

    //P1 coords
    var x2 = this.vertices[3];
    var y2 = this.vertices[4];
    var z2 = this.vertices[5];

    //P2 coords
    var x3 = this.vertices[6];
    var y3 = this.vertices[7];
    var z3 = this.vertices[8];

    //Calculation of distance between vertices
    var a = Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2) + Math.pow((z3 - z2), 2));  //distance between P2 and P1
    var b = Math.sqrt(Math.pow((x1 - x3), 2) + Math.pow((y1 - y3), 2) + Math.pow((z1 - z3), 2));  //distance between P0 and P2
    var c = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));  //distance between P1 and P2

	var cosB = (Math.pow(a,2) - Math.pow(b,2) + Math.pow(c,2)) / (2*a*c);

	this.texCoords.push(
			0, 0,
			c/ampS, 0,
			(c-a*cosB)/ampS, (-(a*Math.sin(Math.acos(cosB))))/ampT,
	);

    this.updateTexCoordsGLBuffers();
}

Triangle.prototype.deScaleTexCoords = function (ampS, ampT){ 
	this.texCoords = [];
    this.updateTexCoordsGLBuffers();
}