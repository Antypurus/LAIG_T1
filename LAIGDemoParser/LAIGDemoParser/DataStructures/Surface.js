function Material(Ka,Kd,Ks,shine){
  this.ambiente_coeficient = Ka;
  this.difuse_coeficient = Kd;
  this.specular_coeficient = Ks;
  this.shininess = shine;
}

function Texture(path,id){
  this.path = path;
  this.id = id;
}
