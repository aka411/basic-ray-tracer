class Hit_Record{
      constructor(point,normal,t){
             
         this.point=point;
         this.normal=normal;
         this.t=t;
         this.material;
         
         this.attenuation;
         this.scatter;
         
         
          this.front_face;
      }
       Set_face_normal(ray,normal){
          
         this.front_face= Dot(ray.direction,normal)<0;
        this.normal=this.front_face? normal: Scale(-1,normal);
        
       }
       
}

class Hittable{
       
      constructor() {
             
      }
       
       
}




class Hittable_list{
       constructor(){
          this.scene=new Array();
          this.count=0;
       }
       
       Add(Hittable_object){
          
          this.count=this.scene.push(Hittable_object);
              
              
       }
       
       Hit(ray,t_min,t_max,rec){
          let temp_rec=new Hit_Record();
          let hit_anything=false;
          let closest_so_far=t_max;
          for(let i=0;i<this.count;i++)    {
                 if(this.scene[i].Hit(ray,t_min,closest_so_far,temp_rec)){
                        hit_anything=true;
                        closest_so_far=temp_rec.t;
                        
                        rec.point=temp_rec.point;
                        rec.normal=temp_rec.normal;
                        rec.t=temp_rec.t;
                       rec.material=temp_rec.material;
                       
                      rec.front_face=temp_rec.front_face;
                 }
                 
                 
          }
              
              
              return hit_anything;
       }
       
       
}


class Sphere extends Hittable{
       
       constructor(center,radius,material){
       super();
       this.center=center;
       this.radius=radius;
       this.material=material;
       
              
       }
       
       Hit(ray,t_min,t_max,rec){
           
           
  const or=  Sub(ray.origin,this.center);
  const a=    Dot(ray.direction,ray.direction);
  const half_b=Dot(ray.direction,or);
  const c= Dot(or,or)-this.radius*this.radius;
  
  const discriminant=half_b*half_b-a*c;
  
  if (discriminant<0){
           return false;
  }
      const sqrt_d=Math.sqrt(discriminant);
      let root= (-half_b-sqrt_d)/(a);
  
         if(root<t_min || t_max<root){
                root= (-half_b+sqrt_d)/(a);
         }
 if(root<t_min || t_max<root){
       
       return false;
         }
              
              rec.t=root;
              rec.point=ray.At(rec.t);
             
              
              //Better scale by radius instead of normalizing
              const normal=Normalize(Sub(rec.point,this.center));
              rec.Set_face_normal(ray,normal);
              rec.material=this.material;
              return true;
       }
       
}