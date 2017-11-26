

/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) 
{
    this.graph = graph;

    this.nodeID = nodeID;

    this.parentID = null;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of leaf nodes.
    this.leaves = [];

    this.animations = new ComboAnimation([]); //every node with animations will have it's animations inside a combo animation, to facilitate transformations

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    // The Animation Boolean defaulting at false
    this.selectable = false;

    this.hasPassed = false;

    //wheter or not the node is selectable
    this.isSelectable = false;
    this.isSelected = false;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) 
{
    this.children.push(nodeID);
}

MyGraphNode.prototype.addAnimation = function(animationID)  //when parsing the nodes with animations, it calls this function that pushes the animationID to the array of ids inside the combo animation
{
    this.animations.addAnimation(animationID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) 
{
    this.leaves.push(leaf);
}


MyGraphNode.prototype.updateAnimations = function (currTime) {
    this.animations.update(currTime);
}

