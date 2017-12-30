
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

  this.endTranslation = {
    x: this.translation.x,
    y: this.translation.y,
    z: this.translation.z
  };

  this.animation = null;

  this.isAlive = true;

  this.mat = new CGFappearance(this.scene);

  switch (this.Color) {
    case ('green'): {
      this.mat.setAmbient(0, 1, 0, 1);
      this.mat.setDiffuse(0, 0.2, 0, 1);
      this.mat.setSpecular(0, 0.7, 0, 1);
      break;
    }
    case ('blue'): {
      this.mat.setAmbient(0, 0, 1, 1);
      this.mat.setDiffuse(0, 0, 0.2, 1);
      this.mat.setSpecular(0, 0, 0.7, 1);
      break;
    }
    case ('yellow'): {
      this.mat.setAmbient(1, 1, 0, 1);
      this.mat.setDiffuse(0.2, 0.2, 0, 1);
      this.mat.setSpecular(0.7, 0.7, 0, 1);
      break;
    }
    case ('red'): {
      this.mat.setAmbient(1, 0, 0, 1);
      this.mat.setDiffuse(0.2, 0, 0, 1);
      this.mat.setSpecular(0.7, 0, 0, 1);
      break;
    }
    default: {
      this.mat.setAmbient(1, 1, 1, 1);
      this.mat.setDiffuse(0.2, 0.2, 0.2, 1);
      this.mat.setSpecular(0.7, 0.7, 0.7, 1);
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

  if (this.animation != null) {
    return;
  } else {
    this.scene.isAnimating = true;
  }

  let cp = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  cp[0][0] = 0;
  cp[0][1] = 0;
  cp[0][2] = 0;

  cp[1][0] = this.translation.x;
  cp[1][1] = this.translation.y + 3.5;
  cp[1][2] = this.translation.z;

  let sz = this.scene.gameBoard.sCell;
  let cx = (x - 1) * sz;
  let cz = (y - 1) * sz;
  let cy = 0;

  cp[2][0] = cx;
  cp[2][1] = cy + 3.5;
  cp[2][2] = cz;

  cp[3][0] = cx;
  cp[3][1] = cy;
  cp[3][2] = cz;

  this.endTranslation.x = cx;
  this.endTranslation.y = cy;
  this.endTranslation.z = cz;

  this.animation = new BezierAnimation(1, cp);
  this.animation.update(0);
};
