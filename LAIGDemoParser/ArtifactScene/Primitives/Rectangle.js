function Rectangle(Scene, Coord1, Coord2) {
  this.scene = Scene;
  this.coord1 = Coord1;
  this.coord2 = Coord2;

  this.setUP();

  CGFobject.call(this, Scene);
  this.initBuffers();
}

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.setUP =
    function() {
  this.vertices = [
    this.coord2.x, this.coord1.y, 0, this.coord1.x, this.coord1.y, 0,
    this.coord2.x, this.coord2.y, 0, this.coord1.x, this.coord2.y, 0
  ];

  this.indices = [0, 1, 2, 1, 3, 2];

  this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

  this.texCoords = [
    this.vertices[0],
    0,
    0,
    0,
    this.vertices[0],
    this.vertices[1],
    0,
    this.vertices[1],
  ];

}

    Rectangle.prototype.initBuffers =
        function() {
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
}

        Rectangle.prototype.ScaleTexCoords =
            function(ampS, ampT) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
    this.texCoords[i] = this.texCoords[i] /
        ampS;  // calculating the updated tex coord in s axis
    this.texCoords[i + 1] = this.texCoords[i + 1] /
        ampT;  // calculating the updated tex coord in t axis
  }
  this.updateTexCoordsGLBuffers();  // call the function to update the texture
                                    // coordinates of the primitive
}

            Rectangle.prototype.deScaleTexCoords = function(ampS, ampT) {
  for (var i = 0; i < this.texCoords.length; i += 2) {
    this.texCoords[i] = this.texCoords[i] * ampS;
    this.texCoords[i + 1] = this.texCoords[i + 1] * ampT;
  }

  this.updateTexCoordsGLBuffers();
}