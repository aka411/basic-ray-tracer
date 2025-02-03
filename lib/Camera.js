class Camera{
      constructor() {
             
    const focal_length=1;
    const viewport_height=4;
    const viewport_width=4;
    const origin=new Vec3(0,0,1);
   
    this.horizontal=new Vec3(viewport_height,0,0);
    this.vertical = new Vec3(0,viewport_width,0);
    
    this.viewport_origin=new Vec3(-viewport_width/2,-viewport_height/2,-focal_length);
      this.ray=new Ray(origin,origin);    
      }
       
    Get_ray(u,v){
           this.ray.Direct(Add(this.viewport_origin,new Vec3(u*this.horizontal.x,v*this.vertical.y,0)));
 return this.ray;
    }
    
    
    
}