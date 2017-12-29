
/**
 *This class serves to keep a record of all the plays
 */
function HistoryKepper() {
  this.currentTurn = 0;
  this.lookingAtTurn = 0;
  this.History = [];
};

/**
 * This functions adds a play to the current turn history
 * @param {number} x the chosen X coordinate
 * @param {number} y the chosen y coordinate
 * @param {array} board the state of the board after the play
 */
HistoryKepper.prototype.addPlayHistory = function(x, y, board) {
  let add = {X: x, Y: y, Board: board};
  let len = this.History.length;
  if (length > lookingAtTurn) {
    this.History[this.lookingAtTurn] = add;
    this.currentTurn = this.lookingAtTurn + 1;
  } else {
    this.History.push(add);
    this.currentTurn = this.History.length;
  }
  this.lookingAtTurn++;
};

/**
 * This function tell us if an undo of the turn is possible
 */
HistoryKepper.prototype.canUndo = function() {
  if (this.lookingAtTurn == 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * This function undos the turn if possible
 */
HistoryKepper.prototype.undoTurn = function() {
  if (this.lookingAtTurn == 0) {
    return null;
  } else {
    this.lookingAtTurn--;
    return this.History[this.lookingAtTurn];
  }
  return null;
};

/**
 * This function tells us if the turn can be redone
 */
HistoryKepper.prototype.canRedo = function() {
  if (this.lookingAtTurn >= this.currentTurn) {
    return false;
  } else {
    return true;
  }
};

/**
 * This function redos an undone turn;
 */
HistoryKepper.prototype.redoTurn = function() {
  if (this.lookingAtTurn >= this.currentTurn) {
    return null;
  } else {
    this.lookingAtTurn++;
    return this.History[this.lookingAtTurn];
  }
  return null;
};