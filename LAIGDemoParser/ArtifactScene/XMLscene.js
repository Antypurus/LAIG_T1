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



  this.firstX = 0;
  this.firstY = 0;

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
          }
        }
      }
      this.pickResults.splice(0, this.pickResults.length);
    }
  }
};

function checkIfGameOver(boardString)
{
  let JsonRequest = 'isGameOver(' + boardString + ')';
  let requestPort = 8082;
  let request = new XMLHttpRequest();
  request.open(
      'GET',
      'http://127.0.0.1:8082' +
          '/' + JsonRequest,
      true);
  request.onload = (function(response) 
  {
      let respondeSplit = response.target.response;     
      console.log(respondeSplit[0]);
      if (respondeSplit[0] === -1) return;
      else if (respondeSplit[0] == "no") return false;
      else if (respondeSplit[0] == "Syntax Error") return false;
      else if (respondeSplit[0] == "yes") return true;
    }).bind(this);
  // request.onerror = onError; TODO VER O QUE FAZER
  request.setRequestHeader(
      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
  this.logPicking();

  if(!checkIfGameOver(this.boardString))
  {
  if ((this.gameType == 1 || this.gameType == 2) &&
      this.currentPlayer.name.indexOf('CPU') !== -1) 
      {

          if (this.isFirstMove)
            firstMoveCom(this.boardString, this.gameDifficulty);
          else
            MoveCom(this.boardString, this.gameDifficulty);
  } else if (
      this.gameType == 1 && this.currentPlayer.name.indexOf('Human') !== -1) {
    if (this.hasClicked) {
      if (this.isFirstMove) {
        moveHuman(this.boardString, this.clickedX, this.clickedY);
        this.hasClicked = false;
        this.clickedX = 0;
        this.clickedY = 0;
      }
    }
  } else {
    if (this.hasClicked) {
      if (this.isFirstMove && this.gameType == 0) {
        firstMoveHuman(this.boardString, this.clickedX, this.clickedY);
        this.hasClicked = false;
        this.clickedX = 0;
        this.clickedY = 0;

      }
      else if(!this.isFirstMove && this.gameType == 0 && this.firstClick)
      {
        this.hasClicked = false;
        this.firstClick = false;
        this.firstX = this.clickedX;
        this.firstY = this.clickedY;
        console.log( this.firstY);
        this.clickedX = 0;
        this.clickedY = 0;
      }
      else if(!this.isFirstMove && this.gameType == 0 && !this.firstClick)
      {
        console.log("here");
        this.hasClicked = false;
        var direction = "";
        var coordXDiff = this.clickedX - this.firstX;
        var coordYDiff = this.firstY - this.clickedY;
        if(coordXDiff < 0)
          direction = "'W'";
        else if(coordXDiff > 0)
          direction = "'S'";
        
        if(coordYDiff < 0)
          direction = "'D'";
        else if(coordYDiff > 0)
          direction = "'A'";
        moveHuman(this.boardString, this.firstX, this.firstY, direction);
        this.clickedX = 0;
        this.clickedY = 0;
        this.firstX = 0;
        this.firstY = 0;
        this.firstClick = true;
      }
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
      this.clearPickRegistration();
      this.setActiveShader(this.defaultShader);

      if (this.pieceManager != null) {
        if (this.pieceManager.board == null) {
          this.pieceManager.board = this.gameBoard;
          this.pieceManager.setUp();
        }
        if (this.pieceManager.board != null) {
          if (this.board != null) {
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
