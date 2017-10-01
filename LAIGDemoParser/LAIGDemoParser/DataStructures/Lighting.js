function lightComponent(r,g,b,a){
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;

    lightComponent.Lighting = function(observer,surface,light){}
}

function Ambient(r,g,b,a){
  lightComponent.call(this,r,g,b,a);

      lightComponent.Lighting = function(observer,surface,light){
          return surface.ambiente_coeficient*light;
      }
}

Ambient.prototype = Object.create(lightComponent.prototype);
Ambient.prototype.constructor = Ambient;

function Difuse(r,g,b,a){
  lightComponent.call(this,r,g,b,a);

      lightComponent.Lighting = function(observer,surface,light){
          return (surface.difuse_coeficient*light);//finish this to acocunt for the angle
      }
}

Difuse.prototype = Object.create(lightComponent.prototype);
Difuse.prototype.constructor = Difuse;

function Specular(r,g,b,a){
  lightComponent.call(this,r,g,b,a);

      lightComponent.Lighting = function(observer,surface,light){
          return surface.specular_coeficient*light;//finish this to acocunt for the angle
      }
}

Specular.prototype = Object.create(lightComponent.prototype);
Specular.prototype.constructor = Specular;

function Light(id,position,ambient,difuse,specular){
    this.enabled = true;
    this.id = id;
    this.position = position;
    this.ambient = ambient;
    this.difuse = difuse;
    this.specular = specular;

    Light.Lighting = function(){
      return 0;//return the sum of the lighting of each of the 3 components
    }

}
