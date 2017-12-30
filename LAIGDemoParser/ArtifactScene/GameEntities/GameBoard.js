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

  this.hitboxes = [];
  this.idCoordMap = new Map();

  this.setUp();
};

/**
 * This Function sets up the different data structure required to manage the
 * game board
 */
GameBoard.prototype.setUp = function() {
  for (let i = 0; i < this.nCells; ++i) {
    for (let j = i; j < this.nCells; ++j) {
      // add the upper values

      let ji = j + 1;
      let ii = i + 1;

      let iid = '' + (i + 1);
      let jid = '' + (j + 1);
      if (i + 1 < 10) {
        iid = (i + 1) + '00'
      }
      if (j + 1 < 10) {
        jid = (j + 1) + '00';
      }

      let box1 = new SquareHitBox(this.scene, this.sCell, '' + iid + jid);
      box1.translation.x = i * this.sCell + this.startX;
      box1.translation.y = this.startY;
      box1.translation.z = j * this.sCell + this.startZ;
      this.hitboxes.push(box1);
      this.idCoordMap.set('' + iid + jid, {x: ii, y: ji});
      // add the lower values
      let box2 = new SquareHitBox(this.scene, this.sCell, '' + jid + iid);
      box2.translation.x = j * this.sCell + this.startX;
      box2.translation.y = this.startY;
      box2.translation.z = i * this.sCell + this.startY;
      this.hitboxes.push(box2);
      this.idCoordMap.set('' + jid + iid, {x: ji, y: ii});
    }
  }
  console.log(this.hitboxes);
};

GameBoard.prototype.getCoords = function(id) {
  if (this.idCoordMap.has(id)) {
    return this.idCoordMap.get(id);
  } else {
    return null;
  }
};