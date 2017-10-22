function Circle(scene,pps,radius){
    this.pps = pps;
    this.scene = scene;
    this.radius = radius;

    CGFobject.call(this,this.scene);
    this.setUP();
    this.initBuffer();
}

Circle.prototype = Object.create(CGFobject.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.setUP = function(){
    var alpha =(360*(Math.PI / 180))/this.pps;
	var ind = 0;
	var curr_x = 0;
	var curr_y = 0;
	var next_x = 0;
	var next_y = 0;
	var curr_alpha = 0;
	this.vertices =[];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
		
	for(var i = 0; i < this.pps; i++){
	//curr_x vai ser o raio do circulo em x	no inicio
    curr_x = Math.cos(curr_alpha)*this.radius;
    //curr_y vai ser 0 no inicio
    curr_y = Math.sin(curr_alpha)*this.radius;
	//curr_alpha incrementa 60 graus para chegar aos novos vertices
    curr_alpha += alpha;
	//x do segundo vertice a seguir ao inicial
    next_x = (Math.cos(curr_alpha)*this.radius);
    //y do segundo vertice a seguir ao inicial
    next_y = (Math.sin(curr_alpha)*this.radius);

    this.vertices.push(curr_x, curr_y,0);

    this.vertices.push(next_x, next_y, 0);
	//centro do circulo
    this.vertices.push(0,0,0);

	this.indices.push(ind, ind + 1, ind + 2);
	this.indices.push(ind+2, ind + 1, ind);
    ind += 3;
	//uma face, as normais sao iguais em todos os vertices
	this.normals.push(0,0,1);
    this.normals.push(0,0,1);
    this.normals.push(0,0,1);

    this.texCoords.push(curr_x/2 + 0.5, -curr_y/2 + 0.5);
	this.texCoords.push(next_x/2 + 0.5, -next_y/2 + 0.5);
	this.texCoords.push(0.5,0.5);
    }
    
    this.scene.scale(this.radius,this.radius,1);
}

Circle.prototype.initBuffer = function(){
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}