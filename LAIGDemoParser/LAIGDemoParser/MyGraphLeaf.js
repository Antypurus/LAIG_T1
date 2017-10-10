
/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem, type)
{
    this.graph = graph;
    this.type = type;
    this.xmlelem = xmlelem;
    var args = graph.reader.getString(this.xmlelem, 'args');
    var argsArray = args.split(" ");
    this.primitive = null;

switch(this.type)
    {
        case 'rectangle':
            var P1 = new position(parseFloat(argsArray[0]), parseFloat(argsArray[1]), 0);
            var P2 = new position(parseFloat(argsArray[2]), parseFloat(argsArray[3]), 0);
            this.primitive = new Rectangle(this.graph.scene, P1, P2);
            break;

        case 'sphere':
            var radius = parseFloat(argsArray[0]);
            var parts_along_radius = parseInt(argsArray[1]);
            var parts_per_section = parseInt(argsArray[2]);
            this.primitive = new Sphere(this.graph.scene, radius, parts_along_radius, parts_per_section);
            break;

        case 'triangle':
            var P1 = new position(parseFloat(argsArray[0]), parseFloat(argsArray[1]), parseFloat(argsArray[2]));
            var P2 = new position(parseFloat(argsArray[3]), parseFloat(argsArray[4]), parseFloat(argsArray[5]));
            var P3 = new position(parseFloat(argsArray[6]), parseFloat(argsArray[7]), parseFloat(argsArray[8]));
            this.primitive = new Triangle(this.graph.scene, P1, P2, P3);
            break;

        case 'cylinder':
            var height = parseFloat(argsArray[0]);
            var bottom_radius = parseFloat(argsArray[1]);
            var top_radius = parseFloat(argsArray[2]);
            var sections_along_height = parseInt(argsArray[3]);
            var parts_per_section = parseInt(argsArray[4]);
            this.primitive = new Cylinder(this.graph.scene, height,  bottom_radius, top_radius, sections_along_height, parts_per_section);
            break;
        default:
            break;
    }
}

MyGraphLeaf.prototype.scaleTexCoords = function(ampS, ampT) {
  if(this.primitive != null){
    for (var i = 0; i < this.object.texCoords.length; i += 2) 
    {
        this.primitive.texCoords[i] = this.object.texCoords[i] / ampS;
        this.primitive.texCoords[i + 1] = this.object.texCoords[i + 1] / ampT;
    }
    this.primitive.updateTexCoordsGLBuffers();
 }
}

//a funcao display desenha o objeto que for criado em cima no mygraphleaf
MyGraphLeaf.prototype.display = function(){
   if(this.primitive != null){
        this.primitive.display();
   }
}
