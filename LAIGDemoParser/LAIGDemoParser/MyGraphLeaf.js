
/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem, type)
{
    this.graph = graph;
    this.type = type;
    this.object = null;
    var str = graph.reader.getString(xmlelem, 'args');
    var stringArray = str.split(" ");

switch(this.type)
    {
        case 'rectangle':
            var x1 = parseFloat(stringArray[0]);
            var y1 = parseFloat(stringArray[1]);
            var x2 = parseFloat(stringArray[2]);
            var y2 = parseFloat(stringArray[3]);
            this.object = new Rectangle(graph.scene, new position(x1, y1 ,0), new position(x2,y2,0));
            break;
        case 'sphere':
            var radius = parseFloat(stringArray[0]);
            var stacks = parseInt(stringArray[1]);
            var slices = parseInt(stringArray[2]);
            this.object = new Sphere(graph.scene, radius, stacks, slices);
            break;
        case 'cylinder':
            var height = parseFloat(stringArray[0]);
            var base = parseFloat(stringArray[1]);
            var top = parseFloat(stringArray[2]);
            var stacks = parseInt(stringArray[3]);
            var slices = parseInt(stringArray[4]);
            this.object = new Cylinder(graph.scene,  base, top, height, stacks, slices);
            break;
        case 'triangle':
            var x1 = parseFloat(stringArray[0]);
            var y1 = parseFloat(stringArray[1]);
            var z1 = parseFloat(stringArray[2]);
            var x2 = parseFloat(stringArray[3]);
            var y2 = parseFloat(stringArray[4]);
            var z2 = parseFloat(stringArray[5]);
            var x3 = parseFloat(stringArray[6]);
            var y3 = parseFloat(stringArray[7]);
            var z3 = parseFloat(stringArray[8]);
            this.object = new Triangle(graph.scene, new position(x1, y1, z1), new position(x2, y2, z2), new position(x3, y3, z3));
        default:
            break;
    }
}

MyGraphLeaf.prototype.display = function(){
   if(this.object != null){
        this.object.display();
   }
}

MyGraphLeaf.prototype.scaleTexCoords = function(ampS, ampT) {
  if(this.object != null){
    for (var i = 0; i < this.object.texCoords.length; i += 2) 
    {
        this.object.texCoords[i] = this.object.texCoords[i] / ampS;
        this.object.texCoords[i + 1] = this.object.texCoords[i + 1] / ampT;
    }
    this.object.updateTexCoordsGLBuffers();
 }
}