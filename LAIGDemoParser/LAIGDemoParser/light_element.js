function lightComponent(r,g,b,a){
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
}

function Light(id,position,ambient,difuse,specular){
    this.enabled = true;
    this.id = id;
    this.position = position;
    this.ambient = ambient;
    this.difuse = difuse;
    this.specular = specular;
}
