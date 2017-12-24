/**
 *Class that handles game board logic
 *
 * @param {CGFscene} scene the scene
 * @param {float} startX the start x coordinate of the board
 * @param {float} startY the start y coordinate of the board
 * @param {float} startZ the start z coordinate of the board
 * @param {int} nCells the number of cells in one direction of the board
 * @param {float} sCell the size of each cell of the board
 */
function GameBoard(scene, startX, startY, startZ, nCells, sCell) {
  this.scene = scene;
  this.startX = startX;
  this.startY = startY;
  this.startZ = startZ;
  this.nCells = nCells;
  this.sCell = sCell;
}