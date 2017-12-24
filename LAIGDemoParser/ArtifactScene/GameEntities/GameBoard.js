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

  this.coordinates = {};
  this.idsToRegister = {};
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
      this.coordinates.push({i, j});
      this.idsToRegister.push('' + i + j);
      this.idCoordMap['' + i + j] = {i, j};
      // add the lower values
      this.coordinates.push({j, i});
      this.idsToRegister.push('' + j + i);
      this.idCoordMap['' + j + i] = {j, i};
    }
  }
  console.log(this.idCoordMap);
};