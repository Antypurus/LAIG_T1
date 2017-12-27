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
  if (this.Scene.board != null) {
    this.board = this.Scene.board;
  }

  this.pieces = {};
};

/**
 *
 */
GamePieceManager.prototype.setUp = function() {
  if (this.board != null) {
    this.nCell = this.board.nCell;
    this.sCell = this.board.sCell;
    this.startX = this.board.startX;
    this.startY = this.board.startY;
    this.startZ = this.board.startZ;

    for (let i = 0; i < this.nCells; ++i) {
      for (let j = i; j < this.nCells; ++j) {
        // add the upper values
        let x = i * sCell;
        let z = j * sCell;

        this.pieces.push(
            new GamePiece(this.Scene, 'green', {x: x, y: this.startY, z: z}));
        // add the lower values
        this.pieces.push(
            new GamePiece(this.Scene, 'green', {x: z, y: this.startY, z: x}));
      }
    }
  } else {
    return 'error';
  }
  return 'error';
};

/**
 *
 */
GamePieceManager.prototype.display = function() {
  this.graph.nodes[this.nodeID].isPiece = false;
  for (let i = 0; i < this.pieces.length; ++i) {
    this.Scene.pushMatrix();

    let piece = this.pieces[i];
    this.Scene.translate(
        piece.translate.x, piece.translate.y, piece.translate.z);

    // this.graph.dradisplayScene(this.nodeID, null, null, null); need to finish
    // this with the proper animations

    this.Scene.popMatrix();
  }
  this.graph.nodes[this.nodeID].isPiece = true;
}