function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {*} Scene
 * @param {*} pieceNodeID
 */
function GamePieceManager(Scene, pieceNodeID) {
  this.Scene = Scene;
  this.nodeID = pieceNodeID;
  this.graph = this.Scene.graph;

  this.board = null;
  if (this.Scene.gameBoard != null) {
    this.board = this.Scene.gameBoard;
  }

  this.pieces = [];
  this.pieceMap = new Map();

  if (this.board != null) {
    this.setUp();
  }
};

/**
 *
 */
GamePieceManager.prototype.setUp = function() {
  if (this.board != null) {
    this.nCell = this.board.nCells;
    this.sCell = this.board.sCell;
    this.startX = this.board.startX;
    this.startY = this.board.startY;
    this.startZ = this.board.startZ;

    for (let i = 0; i < this.nCell; i++) {
      for (let j = i; j < this.nCell; j++) {
        // add the upper values
        let x = i * this.sCell + this.sCell / 2;
        let z = j * this.sCell + this.sCell / 2;

        let iid = '' + (i + 1);
        let jid = '' + (j + 1);
        if (i + 1 < 10) {
          iid = (i + 1) + '00'
        }
        if (j + 1 < 10) {
          jid = (j + 1) + '00';
        }

        let piece1 = new GamePiece(
            this.Scene, this.generateRandomColor(),
            {x: x, y: this.startY, z: z});

        piece1.cell.x = i + 1;
        piece1.cell.y = j + 1;

        this.pieceMap.set('' + iid + jid, piece1);
        this.pieces.push(piece1);
        // add the lower values
        if (i != j) {
          let piece2 = new GamePiece(
              this.Scene, this.generateRandomColor(),
              {x: z, y: this.startY, z: x});

          piece2.cell.x = j + 1;
          piece2.cell.y = i + 1;

          this.pieceMap.set('' + jid + iid, piece2);
          this.pieces.push(piece2);
        }
      }
    }
    return;
  } else {
    console.log('error');
    return 'error';
  }
  console.log('error');
  return 'error';
};

/**
 *
 * @param {*} colors
 */
GamePieceManager.prototype.colorSetUp = function(colors) {
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors[i].length; j++) {
      let iid = '' + (i + 1);
      let jid = '' + (j + 1);
      if (i + 1 < 10) {
        iid = (i + 1) + '00'
      }
      if (j + 1 < 10) {
        jid = (j + 1) + '00';
      }

      if (colors[i][j] == 0) {
        this.pieceMap.get('' + iid + jid).isAlive = false;
        continue;
      } else {
        this.pieceMap.get('' + iid + jid).isAlive = true;
      }
      let color = this.translateNumberToColor(colors[i][j]);
      this.pieceMap.get('' + iid + jid).setUpColor(color);
    }
  }
};

/**
 *
 */
GamePieceManager.prototype.generateRandomColor = function() {
  let rand = getRandomInt(1, 4);
  rand = 1;
  let col = 'random';
  switch (rand) {
    case (1): {
      return 'green';
      break;
    }
    case (3): {
      return 'red';
      break;
    }
    case (4): {
      return 'blue';
      break;
    }
    case (2): {
      return 'yellow';
      break;
    }
    default:
      return null;
      break;
  }
};

/**
 * Translates a prolog response number to a color
 * @param {number} num the number to translate
 */
GamePieceManager.prototype.translateNumberToColor = function(num) {
  switch (num) {
    case (1): {
      return 'green';
      break;
    }
    case (3): {
      return 'red';
      break;
    }
    case (4): {
      return 'blue';
      break;
    }
    case (2): {
      return 'yellow';
      break;
    }
    default:
      return null;
      break;
  }
};

/**
 *
 */
GamePieceManager.prototype.display = function() {
  this.graph.nodes[this.nodeID].isPiece = false;
  for (let i = 0; i < this.pieces.length; ++i) {
    if (this.pieces[i].isAlive) {
      this.Scene.pushMatrix();

      let piece = this.pieces[i];


      this.Scene.translate(
          piece.translation.x, piece.translation.y, piece.translation.z);

      // uses the animation
      if (piece.animation != null) {
        let animationMatrix = mat4.create();
        mat4.identity(animationMatrix);
        piece.animation.applyAnimation(animationMatrix);
        this.Scene.multMatrix(animationMatrix);
      }

      this.graph.displayScene(this.nodeID, null, null, null, piece.mat);

      this.Scene.popMatrix();
    }
  }
  this.graph.nodes[this.nodeID].isPiece = true;
};

/**
 *
 * @param {*} currTime
 */
GamePieceManager.prototype.update = function(currTime) {
  let notUpdate = 0;
  for (let i = 0; i < this.pieces.length; ++i) {
    let piece = this.pieces[i];
    if (piece.animation != null) {
      notUpdate++;
      console.log('is updating');
      piece.animation.update(currTime);
      if (piece.animation.finish) {
        piece.animation = null;
      }
    }
  }
  if (notUpdate == 0) {
    this.Scene.isAnimating = false;
  }
};