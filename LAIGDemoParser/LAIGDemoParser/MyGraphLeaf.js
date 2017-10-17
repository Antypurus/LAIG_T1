
/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem, type, cPoint)
{
    this.graph = graph;
    this.type = type;
    this.xmlelem = xmlelem;
    var args = graph.reader.getString(this.xmlelem, 'args');
    var argsArray = args.split(" ");
    this.primitive = null;
    this.oldprimitive = [];
    this.cPoint = cPoint;

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
        case 'patch':
        var point = this.cPoint;
        var degree1 = parseFloat(argsArray[0]);
        var degree2 = parseFloat(argsArray[1]);
        var knots = [];
        for(var t=0; t < point.length; t++)
        {
			for(var i =0; i < point[t].length; i++)
			{
				knots.push(point[t][i]);
			}
        }
        //var cP = [[knots[0], knots[1]], [knots[2], knots[3]], [knots[4], knots[5]]];
        var node = knots[0];
        var node2 = knots[1];
        var node3 = knots[2];
        var node4 = knots[3];
        var node5 = knots[4];
        var node6 = knots[5];
                var node7 = knots[6];
        var node8 = knots[7];
        var node9 = knots[8];
        var node10 = knots[9];
        var node11 = knots[10];
        var node12 = knots[11];
        var CP = [];
        var CP2 = [];
         var CP3 = [];
          var CP4 = [];
           var CP5 = [];
            var CP6 = [];
                    var CP7 = [];
        var CP8 = [];
         var CP9 = [];
          var CP10 = [];
           var CP11 = [];
            var CP12 = [];
        for(var i =0; i < node.attributes.length;i++)
        {
        	CP.push(node.attributes[i].value);
        	CP = CP.map(Number);
        }
                for(var i =0; i < node2.attributes.length;i++)
        {
        	CP2.push(node2.attributes[i].value);
        	CP2 = CP2.map(Number);
        }
                for(var i =0; i < node3.attributes.length;i++)
        {
        	CP3.push(node3.attributes[i].value);
        	CP3 = CP3.map(Number);
        }
                for(var i =0; i < node4.attributes.length;i++)
        {
        	CP4.push(node4.attributes[i].value);
        	CP4 = CP4.map(Number);
        }
                for(var i =0; i < node5.attributes.length;i++)
        {
        	CP5.push(node5.attributes[i].value);
        	CP5 = CP5.map(Number);
        }
                for(var i =0; i < node6.attributes.length;i++)
        {
        	CP6.push(node6.attributes[i].value);
        	CP6 = CP6.map(Number);
        }

                        for(var i =0; i < node7.attributes.length;i++)
        {
        	CP7.push(node7.attributes[i].value);
        	CP7 = CP7.map(Number);
        }

                        for(var i =0; i < node8.attributes.length;i++)
        {
        	CP8.push(node8.attributes[i].value);
        	CP8 = CP8.map(Number);
        }

                        for(var i =0; i < node9.attributes.length;i++)
        {
        	CP9.push(node9.attributes[i].value);
        	CP9 = CP9.map(Number);
        }

                        for(var i =0; i < node10.attributes.length;i++)
        {
        	CP10.push(node10.attributes[i].value);
        	CP10 = CP10.map(Number);
        }

                        for(var i =0; i < node11.attributes.length;i++)
        {
        	CP11.push(node11.attributes[i].value);
        	CP11 = CP11.map(Number);
        }

                        for(var i =0; i < node12.attributes.length;i++)
        {
        	CP12.push(node12.attributes[i].value);
        	CP12 = CP12.map(Number);
        }
        
        var CPFINAL = [];
        var CP1234 = [];
        var CP5678 = [];
        var CP9101112 = [];
        CP1234.push(CP,CP2,CP3,CP4);
        CP5678.push(CP5,CP6,CP7,CP8);
        CP9101112.push(CP9,CP10, CP11,CP12);
   		CPFINAL.push(CP1234);
   		CPFINAL.push(CP5678);
   		CPFINAL.push(CP9101112);
        this.primitive =this.graph.makeSurface(degree1, degree2,CPFINAL);
            //this.primitive = new CGFnurbsObject(CGFnurbsSurface(degree1,degree2,knots1,knots2,controlpoints), uDivs, vDivs;
            break;
        default:
            break;
    }
}

MyGraphLeaf.prototype.scaleTexCoords = function(ampS, ampT) {
  if(this.primitive != null){
    this.oldprimitive = this.primitive.texCoords;
    for (var i = 0; i < this.primitive.texCoords.length; i += 2) 
    {
        this.primitive.texCoords[i] = this.primitive.texCoords[i] / ampS;
        this.primitive.texCoords[i + 1] = this.primitive.texCoords[i + 1] / ampT;
    }
    this.primitive.updateTexCoordsGLBuffers();
 }
}

MyGraphLeaf.prototype.deScaleTexCoords = function(ampS, ampT) {
  if(this.primitive != null){
    this.oldprimitive = this.primitive.texCoords;
    for (var i = 0; i < this.primitive.texCoords.length; i += 2) 
    {
        this.primitive.texCoords[i] = this.primitive.texCoords[i] * ampS;
        this.primitive.texCoords[i + 1] = this.primitive.texCoords[i + 1] * ampT;
    }
    this.primitive.updateTexCoordsGLBuffers();
 }
}


//a funcao display desenha o objeto que for criado em cima no mygraphleaf
MyGraphLeaf.prototype.display = function(ampS, ampT){
   if(this.primitive != null){
        this.primitive.display();
   }
}
