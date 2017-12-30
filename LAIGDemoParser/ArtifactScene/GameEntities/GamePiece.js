
/**
 *
 * @param {*} scene
 * @param {*} color
 * @param {*} position
 */
function GamePiece(scene, color, position) {
  this.scene = scene;
  this.Color = color;
  this.cell = {x: 0, y: 0};
  this.translation = {x: 0, y: 0, z: 0};
  this.translation.x += position.x;
  this.translation.y += position.y;
  this.translation.z += position.z;

  this.isAlive = true;

  this.mat = new CGFappearance(this.scene);

  switch (this.Color) {
    case ('green'): {
      this.mat.setAmbient(0, 1, 0, 1);
      this.mat.setDiffuse(0, 1, 0, 1);
      this.mat.setSpecular(0, 1, 0, 1);
      break;
    }
    case ('blue'): {
      this.mat.setAmbient(0, 0, 1, 1);
      this.mat.setDiffuse(0, 0, 1, 1);
      this.mat.setSpecular(0, 0, 1, 1);
      break;
    }
    case ('yellow'): {
      this.mat.setAmbient(1, 1, 0, 1);
      this.mat.setDiffuse(1, 1, 0, 1);
      this.mat.setSpecular(1, 1, 0, 1);
      break;
    }
    case ('red'): {
      this.mat.setAmbient(1, 0, 0, 1);
      this.mat.setDiffuse(1, 0, 0, 1);
      this.mat.setSpecular(1, 0, 0, 1);
      break;
    }
    default: {
      this.mat.setAmbient(1, 1, 1, 1);
      this.mat.setDiffuse(1, 1, 1, 1);
      this.mat.setSpecular(1, 1, 1, 1);
      break;
    }
  }
};

/**
 *
 * @param {*} color
 */
GamePiece.prototype.setUpColor = function(color) {
  switch (color) {
    case ('green'): {
      this.mat.setAmbient(0, 1, 0, 1);
      this.mat.setDiffuse(0, 1, 0, 1);
      this.mat.setSpecular(0, 1, 0, 1);
      break;
    }
    case ('blue'): {
      this.mat.setAmbient(0, 0, 1, 1);
      this.mat.setDiffuse(0, 0, 1, 1);
      this.mat.setSpecular(0, 0, 1, 1);
      break;
    }
    case ('yellow'): {
      this.mat.setAmbient(1, 1, 0, 1);
      this.mat.setDiffuse(1, 1, 0, 1);
      this.mat.setSpecular(1, 1, 0, 1);
      break;
    }
    case ('red'): {
      this.mat.setAmbient(1, 0, 0, 1);
      this.mat.setDiffuse(1, 0, 0, 1);
      this.mat.setSpecular(1, 0, 0, 1);
      break;
    }
    default: {
      this.mat.setAmbient(1, 1, 1, 1);
      this.mat.setDiffuse(1, 1, 1, 1);
      this.mat.setSpecular(1, 1, 1, 1);
      break;
    }
  }
};
