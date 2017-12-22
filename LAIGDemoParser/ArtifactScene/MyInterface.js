/**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
  // call CGFinterface constructor
  CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
  // call CGFinterface init
  CGFinterface.prototype.init.call(this, application);

  // init GUI. For more information on the methods, check:
  //  http://workshop.chromeexperiments.com/examples/gui

  this.gui = new dat.GUI();
  this.gui.close();

  this.insertElementIntoDOM('HI', 'special id');

  // add a oup of controls (and open/expand by defult)
  this.gui.addColor(this.scene, 'filterColor').name('Filter Color');

  return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

  var group = this.gui.addFolder('Lights');
  group.open();

  // add two check boxes to the group. The identifiers must be members variables
  // of the scene initialized in scene.init as boolean e.g. this.option1=true;
  // this.option2=false;

  for (var key in lights) {
    if (lights.hasOwnProperty(key)) {
      this.scene.lightValues[key] = lights[key][0];
      console.log('GUI:' + key);
      group.add(this.scene.lightValues, key);
    }
  }
};

MyInterface.prototype.insertElementIntoDOM = function(html, id) {
  var fragmnet = document.createDocumentFragment();
  var div = document.createElement('div');
  div.id = id;
  div.innerHTML = html;
  div.style.color = '#FFFFFF';
  div.style.position = 'absolute';
  fragmnet.appendChild(div);

  document.body.insertBefore(fragmnet, document.body.childNodes[0]);
};
