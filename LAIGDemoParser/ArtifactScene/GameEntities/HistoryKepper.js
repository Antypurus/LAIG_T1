
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
HistoryKepper.prototype.addPlayHistory = function(x, y, board, boardString, firstmove) {
  let add = {X: x, Y: y, Board: board, BoardString: boardString, Firstmove: firstmove};
  let len = this.History.length;
  if (length > this.lookingAtTurn) {
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
    let returnValue = this.History[this.lookingAtTurn];
    this.History.pop();
    return returnValue;
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

/**
 * This function return an object of the class that handles the game movie
 */
HistoryKepper.prototype.getGameMovie = function() {
  let movie = new GameMovie(this.history);
  return movie;
};

/**
 * Class that handles the game movie
 * @param {array} history the full history of the game
 */
function GameMovie(history) {
  this.atTurn = 0;
  this.history = history;
};

/**
 * Start playing the game movie , return the start state of the board
 */
GameMovie.prototype.Play = function() {
  return this.history[0];
};

/**
 * Obtains the next play of the game movie
 */
GameMovie.prototype.NextStep = function() {
  this.atTurn++;
  return this.history[this.atTurn];
};

/**
 * Allows to set the current turn of the game movie , returning the
 * corresponding turn move
 * @param {number} turn the turn to set to
 */
GameMovie.prototype.setTurn = function(turn) {
  if (turn < 0 || turn >= this.history.length) {
    return null;
  } else {
    this.atTurn = turn;
    return this.history[this.atTurn];
  }
  return null;
};