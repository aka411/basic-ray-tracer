class Ray {
        constructor(origin,direction) {
         
          this.origin=origin;
          this.direction=direction;
           this.point;
      }
       
     Direct(direction)  {
         this.direction=direction;   
            
     }
    At(t){
         this.point=Add(this.origin,Scale(t,this.direction));
        
          return this.point; 
           
    }
    
    
    
}


function Ray_color(ray,world,depth){
       
       
       let rec=new Hit_Record();
        
       if(depth<=0){return new Vec3(0,0,0);}
      
       if(world.Hit(ray,0.001,Infinity,rec)){
              
              
              
              if(rec.material.Scatter(ray,rec)){
                     
                     let a=Vec_dot(rec.attenuation,Ray_color(rec.scatter,world,depth-1));
             //console.log(rec.attenuation);
             return a;
              }
              return new Vec3(0,0,0);
              
              
         /*   const n=rec.normal;
            const p=rec.point;
            const sphere_center=Add(p,n);
            const s=Add(Normalize(Random_vec()),sphere_center);
            const reflected_ray=new Ray (p,Sub(s,p));
            return Scale(0.5,Ray_color(reflected_ray,world,depth-1));
            */
            //return (Scale(0.5,Add(N,new Vec3(1,1,1))));
       }
       
       
     let unit_vector=(Normalize(ray.direction));
     
   //Lerp
    const  t=0.5*(unit_vector.y+1);
     let a=(Scale((1-t),new Vec3(1.0,1.0,1.0)));
     let bt=((Scale(t,new Vec3(0.5,0.7,1.0))));
   return (Add(a,bt));
       
       
}