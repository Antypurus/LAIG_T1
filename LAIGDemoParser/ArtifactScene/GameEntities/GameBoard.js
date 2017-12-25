/**
 *Class that handles game board logic
 *
 * @param {CGFscene} scene the scene
 * @param {number} startX the start x coordinate of the board
 * @param {number} startY the start y coordinate of the board
 * @param {number} startZ the start z coordinate of the board
 * @param {number} nCells the number of cells in one direction of the board
 * @param {number} sCell the size of each cell of the board
 */
function GameBoard(scene, startX, startY, startZ, nCells, sCell) {
  this.scene = scene;
  this.startX = startX;
  this.startY = startY;
  this.startZ = startZ;
  this.nCells = nCells;
  this.sCell = sCell;

  this.hitboxes = {};
  this.idCoordMap = new Map();
};

/**
 * This Function sets up the different data structure required to manage the
 * game board
 */
GameBoard.prototype.setUp = function() {
  for (let i = 0; i < this.nCells; ++i) {
    for (let j = i; j < this.nCells; ++j) {
      // add the upper values
      let box1 = new SquareHitBox(this.scene, this.sCell, '' + i + j);
      box1.translation.x = i;
      box1.translation.z = j;
      this.hitboxes.push(box1);
      this.idCoordMap['' + i + j] = {i, j};
      // add the lower values
      let box2 = new SquareHitBox(this.scene, this.sCell, '' + j + i);
      box2.translation.x = j;
      box2.translation.z = i;
      this.hitboxes.push(box2);
      this.idCoordMap['' + j + i] = {j, i};
    }
  }
  console.log(this.idCoordMap);
};