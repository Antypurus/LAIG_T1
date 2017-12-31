var DEGREE_TO_RAD = Math.PI / 180;
var UPDATE_TIME = 10;
/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
  CGFscene.call(this);

  this.pieceMangar = null;
  this.gameBoard = null;
  this.pieceManager = null;
  this.board = null;
  this.boardString = null;
  this.player1 = null;
  this.player2 = null;
  this.gameType = null;
  this.gameDifficulty = null;
  this.isFirstMove = true;
  this.currentPlayer = null;
  this.firstClick = true;

  this.stop = false;
  this.once = false;

  this.lockSecondMove = false;

  this.isAnimating = false;

  this.firstX = 0;
  this.firstY = 0;

  this.selectedPiece = null;

  this.hasClicked = false;
  this.clickedX = 0;
  this.clickedY = 0;

  this.boardS = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  ];

  this.boardX = null;

  this.audio = new Audio('frog.mp3');

  this.interface = interface;
  this.initiaConfig = null;

  this.filterColor = [255.0, 0.0, 0.0];

  this.scaleFactor = 5.0;
  this.attenuation = 500.0;

  this.lightValues = {};
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera
 * and the axis.
 */
XMLscene.prototype.init = function(application) {
  CGFscene.prototype.init.call(this, application);

  this.initCameras();

  this.enableTextures(true);

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

  this.axis = new CGFaxis(this);
  this.setUpdatePeriod(UPDATE_TIME);
  this.alternateShader = new CGFshader(
      this.gl, 'shaders/vertexExpand.vert', 'shaders/fragmentRecolor.frag');
  this.invisShader = new CGFshader(
      this.gl, 'shaders/invisVert.vert', 'shaders/invisFrag.frag');
  this.bindTimeFactor(0.0);

  this.setPickEnabled(true);
  this.currentPlayer = this.player1;
};

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
  var i = 0;
  // Lights index.

  // Reads the lights from the scene graph.
  for (var key in this.graph.lights) {
    if (i >= 8) break;  // Only eight lights allowed by WebGL.

    if (this.graph.lights.hasOwnProperty(key)) {
      var light = this.graph.lights[key];

      this.lights[i].setPosition(
          light[1][0], light[1][1], light[1][2], light[1][3]);
      this.lights[i].setAmbient(
          light[2][0], light[2][1], light[2][2], light[2][3]);
      this.lights[i].setDiffuse(
          light[3][0], light[3][1], light[3][2], light[3][3]);
      this.lights[i].setSpecular(
          light[4][0], light[4][1], light[4][2], light[4][3]);

      this.lights[i].setVisible(true);
      if (light[0])
        this.lights[i].enable();
      else
        this.lights[i].disable();

      this.lights[i].update();

      i++;
    }
  }
};

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
  this.camera = new CGFcamera(
      0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application
 * has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() {
  this.camera.near = this.graph.near;
  this.camera.far = this.graph.far;
  this.axis = new CGFaxis(this, this.graph.referenceLength);

  this.setGlobalAmbientLight(
      this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
      this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

  this.gl.clearColor(
      this.graph.background[0], this.graph.background[1],
      this.graph.background[2], this.graph.background[3]);

  this.initLights();

  var date = new Date();
  this.lastCurrTime = date.getTime();  // time in milliseconds

  // Adds lights group.
  this.interface.addLightsGroup(this.graph.lights);
};


XMLscene.prototype.logPicking = function() {
  if (this.pickMode == false) {
    if (this.pickResults != null && this.pickResults.length > 0) {
      for (var i = 0; i < this.pickResults.length; i++) {
        var obj = this.pickResults[i][0];
        if (obj) {
          var customId = this.pickResults[i][1];
          console.log('Picked object: ' + obj + ', with pick id ' + customId);

          let ret = this.gameBoard.getCoords(customId);
          if (ret != null) {
            this.audio.play();
            this.clickedX = ret.x;
            this.clickedY = ret.y;
            this.hasClicked = true;

            // handles the selection effect for the pieces
            if (!this.isAnimating) {
              if (this.selectedPiece != null) {
                this.selectedPiece.isSelected = false;
              }
              this.selectedPiece = this.pieceManager.pieceMap.get(customId);
              this.selectedPiece.isSelected = true;
            }
          }
        }
      }
      this.pickResults.splice(0, this.pickResults.length);
    }
  }

};

function checkIfGameOver(boardString) {
  let JsonRequest = 'isGameOver(' + boardString + ')';
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) {
    let responseSplit = response.target.response;
    console.log(responseSplit[0]);
    if (responseSplit[0] === -1)
      scene.stop = false;
    else if (responseSplit[0] == 'n')
      scene.stop = false;
    else if (responseSplit[0] == 'Syntax Error')
      scene.stop = false;
    else if (responseSplit[0] == 'y')
      scene.stop = true;
    else
      scene.stop = true;
  })
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
  return scene.stop;
}

function handleSpaceInput(boardString, isFirstMove, gameDifficulty) {
  if (scene.currentPlayer.name.indexOf('Human') == -1) {
    let body = document.getElementsByTagName('body')[0];
    body.onkeyup = function(e) {
      if (e.keyCode == 32) {
        if (isFirstMove) {
          firstMoveCom(boardString, gameDifficulty);
        } else {
          let stop = ' ';
          stop = checkIfGameOver(boardString);
          scene.stop = stop;

          if (!scene.stop) {
            MoveCom(boardString, gameDifficulty);
          }
        }
      }
    }
  }
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
  this.logPicking();

  if (this.isAnimating && this.selectedPiece != null) {
    this.selectedPiece.isSelected = false;
    this.selectedPiece = null;
  }

  if (scene.stop && !scene.once) {
    scene.once = true;
    let bestScore = 0;
    let bestPlayer = 0;
    if (scene.player1.score > scene.player2.score) {
      bestScore = scene.player1.score;
      bestPlayer = scene.player1.name;
    } else {
      bestScore = scene.player2.score;
      bestPlayer = scene.player2.name;
    }

    let body = document.getElementsByTagName('body')[0];
    body.innerHTML = `<br> <br> 
    <div> 
      <img src="scenes/images/froglet.png" alt="logo" /> 
    </div> <br> <br>
    <script id="script" src="main.js"> </script>
    <div id="optionsList">
      <h1> The winner was ` +
        bestPlayer + ` with ` + bestScore + ` points! </h1>
      <div onclick = "mainMenu()"><button class = "button">Go back</button></div> <br>
    </div>`;

  } else if (
      (this.gameType == 2) && this.currentPlayer.name.indexOf('CPU') !== -1 &&
      !scene.once) {
    handleSpaceInput(this.boardString, this.isFirstMove, this.gameDifficulty);
  }

  else if (
      this.gameType == 1 && this.currentPlayer.name.indexOf('CPU') !== -1 &&
      !scene.once) {
    handleSpaceInput(this.boardString, this.isFirstMove, this.gameDifficulty);
  }

  else {
    if(this.lockSecondMove)
    {
      let xCoord = this.clickedX;
      let yCoord = this.clickedY;
      if(Number(xCoord) <= 9)
        xCoord += "00";
      if(Number(yCoord) <= 9)
        yCoord += "00";
        
      this.selectedPiece = this.pieceManager.pieceMap.get(xCoord + yCoord);
      this.selectedPiece.isSelected = true;
    }
    if (this.hasClicked) {
      if (this.isFirstMove) {
        this.selectedPiece.isSelected = false;
        firstMoveHuman(this.boardString, this.clickedX, this.clickedY);
        this.hasClicked = false;
        this.clickedX = 0;
        this.clickedY = 0;

      } else if (!this.isFirstMove && this.firstClick) {
        this.hasClicked = false;
        this.firstClick = false;
        this.firstX = this.clickedX;
        this.firstY = this.clickedY;
        this.clickedX = 0;
        this.clickedY = 0;
      }
      
      else if (!this.isFirstMove && !this.firstClick && (this.clickedX != this.firstX || this.clickedY != this.firstY)) {
        if(!this.lockSecondMove)
          this.selectedPiece.isSelected = false;
        else 
          this.lockSecondMove = false;

        this.hasClicked = false;
        var direction = '';
        var coordXDiff = this.clickedX - this.firstX;
        var coordYDiff = this.firstY - this.clickedY;
        if (coordXDiff < -1  && coordXDiff >= -2)
          direction = '\'W\'';
        else if (coordXDiff > 1 && coordXDiff <= 2)
          direction = '\'S\'';

        else if (coordYDiff < -1  && coordYDiff >= -2)
          direction = '\'D\'';
        else if (coordYDiff > 1 && coordYDiff <= 2)
          direction = '\'A\'';
        else
          this.firstClick = true;

        if(!this.firstClick) moveHuman(this.boardString, this.firstX, this.firstY, direction);
        this.firstClick = true;
      }
      else if(!this.isFirstMove && !this.firstClick)
      {
        this.selectedPiece.isSelected = false;
        this.hasClicked = false;
        this.firstClick = true;
      }
    }
  }

  // ---- BEGIN Background, camera and axis setup

  // Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  // Initialize Model-View matrix as identity (no transformation
  this.updateProjectionMatrix();
  this.loadIdentity();

  // Apply transformations corresponding to the camera position relative to the
  // origin
  this.applyViewMatrix();

  // this.setActiveShader(this.alternateShader);
  this.pushMatrix();

  if (this.graph.loadedOk) {
    // console.log("Graph Loaded!");
    // Applies initial transformations.
    this.multMatrix(this.graph.initialTransforms);

    // reponsible for the pickable hitboxes
    if (this.gameBoard != null) {
      if (!this.isAnimating) {
        this.setActiveShader(this.invisShader);
        for (let i = 0; i < this.gameBoard.hitboxes.length; ++i) {
          this.pushMatrix();

          let hitbox = this.gameBoard.hitboxes[i];
          this.translate(
              hitbox.translation.x, hitbox.translation.y, hitbox.translation.z);
          this.scale(1, 2.5, 1);

          this.registerForPick(
              this.gameBoard.hitboxes[i].ID, this.gameBoard.hitboxes[i]);

          hitbox.display();

          this.popMatrix();
        }
        this.setActiveShader(this.defaultShader);
      }
      this.clearPickRegistration();

      if (this.pieceManager != null) {
        if (this.pieceManager.board == null) {
          this.pieceManager.board = this.gameBoard;
          this.pieceManager.setUp();
        }
        if (this.pieceManager.board != null) {
          if (this.board != null && !this.isAnimating) {
            this.pieceManager.colorSetUp(this.board);
          }
          this.pieceManager.display();
        }
      }
    }

    // Draw axis
    // this.axis.display();

    var i = 0;
    for (var key in this.lightValues) {
      if (this.lightValues.hasOwnProperty(key)) {
        if (this.lightValues[key]) {
          this.lights[i].setVisible(false);
          this.lights[i].enable();
        } else {
          this.lights[i].setVisible(false);
          this.lights[i].disable();
        }
        this.lights[i].update();
        i++;
      }
    }

    // display scene
    this.graph.displayScene(this.graph.idRoot, null, null);
  } else {
    // Draw axis
    this.axis.display();
  }

  this.popMatrix();
  // this.setActiveShader(this.defaultShader);

  // ---- END Background, camera and axis setup
};

XMLscene.prototype.update = function(currTime) {
  if (this.graph.loadedOk) {
    this.bindTimeFactor(currTime);
    var elapsedTime = currTime - this.lastCurrTime;
    this.lastCurrTime = currTime;
    this.graph.updateAnimations(elapsedTime);
    this.pieceManager.update(elapsedTime);
  }
};

XMLscene.prototype.bindTimeFactor = function(currTime) {
  var normalizedTime =
      Math.abs(Math.sin(currTime / this.attenuation) / 2 + 0.5);
  this.alternateShader.setUniformsValues({timeFactor: normalizedTime});
  this.alternateShader.setUniformsValues({scaleFactor: this.scaleFactor});
  this.alternateShader.setUniformsValues({
    color: vec3.fromValues(
        this.filterColor[0] / 255.0, this.filterColor[1] / 255.0,
        this.filterColor[2] / 255.0)
  });
};
