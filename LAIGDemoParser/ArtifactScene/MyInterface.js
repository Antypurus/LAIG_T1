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

/**
 * This function add a div with the specified inner html and the specified id
 * the div is inserter in the top of the body html
 * 
 * @param {string} html html of the element you want to add
 * @param {string} id id to give the div your html will be contained in
 */
MyInterface.prototype.insertElementIntoDOM = function(html, id) {
  var fragmnet = document.createDocumentFragment(); //create a fragment to inser the div into
  var div = document.createElement('div');  ///create a div to inser the element into
  div.id = id;                        /// sets the div id to the specified
  div.innerHTML = html;               // sets the inner html of the div to the specified html
  div.style.color = '#FFFFFF';        // standard text color is white
  div.style.position = 'absolute';    //This css modification is necessary in order to verlarp the the element with the canvas 
  fragmnet.appendChild(div); //insert the element into the document fragment

  document.body.insertBefore(fragmnet, document.body.childNodes[0]);
};
