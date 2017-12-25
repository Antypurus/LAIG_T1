/**
 * A square hitbox
 *
 * @param {CGFscene} scene the scene
 * @param {number} size the side lenght of the cube
 * @param {string} id hitbox identifier
 */
function SquareHitBox(scene, size, id) {
  this.scene = scene;
  this.Size = size;
  this.ID = id;

  this.translation = {x: 0, y: 0, z: 0};
  this.scale = {x: 1, y: 1, z: 1};
  this.rotaion = {x: 0, y: 0, z: 0};

  this.setUp();

  CGFobject.call(this, scene);
  this.initBuffers();
};

SquareHitBox.prototype = Object.create(CGFobject.prototype);
SquareHitBox.prototype.constructor = SquareHitBox;

/**
 * Sets up the vertices and indices
 */
SquareHitBox.prototype.setUp = function() {
  this.vertices = [
    0, 0,         0,         this.Size, 0,         0,
    0, this.Size, 0,         this.Size, this.Size, 0,
    0, 0,         this.Size, this.Size, 0,         this.Size,
    0, this.Size, this.Size, this.Size, this.Size, this.Size
  ];

  console.log(this.vertices.length);

  this.indices = [
    1, 0, 2, 1, 2, 3, 0, 4, 2, 4, 6, 2, 5, 7, 4, 7, 6, 4,
    1, 3, 7, 7, 5, 1, 2, 6, 7, 7, 3, 2, 0, 1, 4, 1, 5, 4
  ];

  this.normals =
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

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
};

SquareHitBox.prototype.initBuffers = function() {
  this.primitiveType = this.scene.gl.LINES;
  this.initGLBuffers();
};