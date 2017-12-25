var DEGREE_TO_RAD = Math.PI / 180;
var UPDATE_TIME = 10;
/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
  CGFscene.call(this);

  this.gameBoard = null;

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
  this.bindTimeFactor(0.0);
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

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
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

    if (this.gameBoard != null) {
      for (let i = 0; i < this.gameBoard.hitboxes.length; ++i) {
        this.pushMatrix();

        let hitbox = this.gameBoard.hitboxes[i];

        // this.translation(
        // hitbox.translation.x, hitbox.translation.y, hitbox.translation.z);
        // this.scale(hitbox.scale.x, hitbox.scale.y, hitbox.scale.z);

        hitbox.display();

        this.popMatrix();
      }
    }

    // Draw axis
    this.axis.display();

    var i = 0;
    for (var key in this.lightValues) {
      if (this.lightValues.hasOwnProperty(key)) {
        if (this.lightValues[key]) {
          this.lights[i].setVisible(true);
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
