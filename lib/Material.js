class Material{
       
       constructor(){
              
              
              
       }
       
      
       
       
       
}

class Lambertian extends Material{
       
       constructor(a){
              super();
              this.albedo= a;
              
              
       }
       
       
       Scatter(ray_in,rec){
              
            let scatter_direction=Normalize(Add(rec.normal,Random_unit_vec())) ;
             
             if(Near_zero(scatter_direction)){scatter_direction=rec.normal;}
             
              rec.attenuation=this.albedo;
              rec.scatter=new Ray(rec.point,scatter_direction);
              
              return true;
       }
       
       
}

class Metal extends Material{
      
       constructor(a,fuzz){
              super();
              this.albedo= a;
              this.fuzz=fuzz;
              
       }
       
       
       Scatter(ray_in,rec){
              
             const reflected=Reflect(Normalize(ray_in.direction),rec.normal);
             
             
             
              rec.attenuation=this.albedo;
              rec.scatter=new Ray(rec.point,Add(reflected,Scale(this.fuzz,Random_unit_vec())));
             return (Dot(rec.scatter.direction,rec.normal)>0);
       
       
}
}



class Dielectric extends Material{
      
       constructor(n2){
              super();
              this.albedo=new Vec3 (1.0,1.0,1.0);
              this.n2=n2;
              
              
       }
       
       
       Scatter(ray_in,rec){
              
            
           
      
        const ray_direction =Refract(ray_in,rec);
          
         
          
          
             
             
              rec.attenuation=this.albedo;
              rec.scatter=new Ray(rec.point,ray_direction);
             return true;
       
       
}
}