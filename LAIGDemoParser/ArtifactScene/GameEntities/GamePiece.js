
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

  this.animation = null;

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

/**
 *
 * @param {*} x
 * @param {*} y
 */
GamePiece.prototype.moveTo = function(x, y) {

  let cp = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  cp[0][0] = this.translation.x;
  cp[0][1] = this.translation.y;
  cp[0][2] = this.translation.z;

  cp[1][0] = this.translation.x;
  cp[1][1] = this.translation.y + 1.5;
  cp[1][2] = this.translation.z;

  let sz = this.scene.gameBoard.sCell;
  let x = x * sz;
  let z = y * sz;
  let y = 0;

  cp[2][0] = x;
  cp[2][1] = y + 1.5;
  cp[2][2] = z;

  cp[3][0] = x;
  cp[3][1] = y;
  cp[3][2] = z;

  this.animation = new BezierAnimation(1, cp);
};
