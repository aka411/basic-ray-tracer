class Vec3{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;

  }
  
  
  
}
function Add(a,b)
{
  return new Vec3(a.x+b.x,a.y+b.y,a.z+b.z);     
}

function Sub(a,b){
  return new Vec3(a.x-b.x,a.y-b.y,a.z-b.z);         
}

function Dot(a,b)
{
  return (a.x*b.x+a.y*b.y+a.z*b.z);
}

function Cross(a,b)
{
  return new Vec3((b.z*a.y-b.y*a.z),-(b.z*a.x-b.x*a.z),(b.y*a.x-b.x*a.y));
  
}

function Vec_Mag(a)
{
  return Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z);
}

function Normalize(a)
{
  const M=Vec_Mag(a);
 
  return new Vec3(a.x/M,a.y/M,a.z/M);
}

function Scale(s,a)
{
       return new Vec3 (s*a.x,s*a.y,s*a.z);
}

function Random_unit_vec(){
       //In unit sphere
       return Normalize(new Vec3(Math.random(),Math.random(),Math.random()));
}


function Near_zero(v){
       const s= 1e-8;
       return ((v.x<s)&&( v.y <s)&&(v.z<s));
       
}

function Reflect(v,n){
       
       
       return Sub(v,Scale(2*Dot(v,n),n));
}


function Refract(ray,rec){
 
   const normal=Normalize(rec.normal);
   const R= Normalize(ray.direction);
   const Neg_n=Scale(-1,normal);
   const Neg_r=Scale(-1,R);
   const Ratio=rec.front_face? (1/rec.material.n2):rec.material.n2;
   const cos_t1=Dot(Neg_r,normal);
   const sin_t1=Math.sqrt(1-(cos_t1*cos_t1));
   
   
   if(Ratio*sin_t1>1.0){
          
   return  Reflect(R,normal)  ; 
   }else{
   
   
   
   const sin_t2=Ratio*sin_t1;
   const cos_t2=Math.sqrt(1-(sin_t2*sin_t2));
   
   const i=Scale(sin_t2,Cross(Cross(Neg_n,R),normal));
   const j=Scale(cos_t2,Neg_n);
   return Add(i,j);
   }
   
 /*  
console.log(j);
console.log(i);
console.log(cos_t2);
   */
 
   /*
 let ratio=rec.front_face? (1/rec.material.n2):rec.material.n2;
 
let cos_theta = Math.min(Dot(Scale(-1,Normalize(ray.direction)),Normalize(rec.normal)),1);
let r_out_perp =Scale(ratio,(Add (ray.direction,Scale(cos_theta,rec.normal))));
let r_out_parallel =Scale( -1*Math.sqrt(Math.abs(1.0 -(Vec_Mag( r_out_perp)*Vec_Mag(r_out_perp)))), rec.normal);
*/
/*
console.log(r_out_parallel);
console.log(r_out_perp);
console.log(cos_theta);



return Add(r_out_perp, r_out_parallel);
*/


 
    
    
      
}



function Vec_dot(a,b){
       
       
       return new Vec3(a.x*b.x,a.y*b.y,a.z*b.z);
}
/***************
 Non Vector maths
 ***************/
 
 function Clamp(x,min,max){
        if(x<min){return min;}
        if(x>max){return max;}
        return x;
 }