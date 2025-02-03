





   //hard coded solution for getying back class structure
   //this is an example of what not to do


    function objectToWorld(data){
        /*
          ###### object#######
        //[ scene:array[obj0,obj1,...obj5] |  count:  ]
        //obj0=> [center: | radius: | material: ]
        //material=> [albedo: | ?n2: | ?fuzz: ]  depends on material type
        //material type found from material parameters

           ######  hit list   Class ######
        //[ scene:array[class sphere0,sphere1,...shpere5] |  count:integer  ]
        //sphere0=> [center:vec3 | radius: integer | material: class material ]
        //material=> [albedo: vec3 | ?n2: decimal | ?fuzz:decimal ]  depends on material type
        //material type found from material parameters

        albedo-->lambertian
        albedo(constant),n2-->dielectric
        albedo,fuzz-->metal

        */


        function getMaterial(data){
               let txt="";
               for (let x in data){

                      txt+=x +" ";
               }

               switch(txt){

                     case "albedo " :
                            return new Lambertian(new Vec3(data.albedo.x,data.albedo.y,data.albedo.z));
                            break;

                      case "albedo n2 " :
                             return new Dielectric(data.n2);
                             break;

                       case "albedo fuzz " :
                              return new Metal(new Vec3(data.albedo.x,data.albedo.y,data.albedo.z),data.fuzz);
                              break;
                      default:
                      break;

               }

               return 0;

        }




        let world=new Hittable_list();

        const count = data.count;

        for (let i = 0; i<count ; i++) {


                 world.Add ( new Sphere (
                        new Vec3 (data.scene[i].center.x, data.scene[i].center.y,data.scene[i].center.z),
                        data.scene[i].radius,
                        getMaterial(data.scene[i].material ) ))  ;


              }

       return world;

        }



    function findOffsets(id, maxWorkers, canvasWidth, canvasHeight) {

           /*

           #-------|---------#
         2 #    4  |    5    #
           #-------|---------#
     n   1 #   2   |    3    #
           #-------|---------#
         0 #   0   |    1    #
           #-------|---------#
               0        1
                   m
           */




           const m = (maxWorkers % 2 != 0)? maxWorkers : (maxWorkers / 2);
           const n = (m===maxWorkers)? 1 : 2;


           const oneDivXLength = canvasWidth / m;
           const oneDivYLength = canvasHeight / n;


           if (n===1) {
                  const offSetX = id * oneDivXLength;
                  return {

                 'offSetX' : offSetX,
                 'offSetY' : 0,
                 'lengthX' : oneDivXLength,
                 'lengthY' : oneDivYLength

                  };}


           {
           const offSetX = (id - m >= 0)? ((id - m) *oneDivXLength) : (id * oneDivXLength ) ;
           const offSetY = (id - m >= 0)? oneDivYLength : 0;
           return {
                 'offSetX' : offSetX ,
                 'offSetY' : offSetY,
                 'lengthX' : oneDivXLength,
                 'lengthY' : oneDivYLength

           };

           }


    }















    function getPixelData(offSetX, offSetY, lengthX, lengthY, canvasWidth, canvasHeight, samplesPerPixel, world) {

const scale = 1/samplesPerPixel;

let color = new Vec3(0, 0, 0);

let camera = new Camera();

let u = 0, v = 0, r = 0, g = 0, b = 0;

let pixelData=new Array();


    for (let j = 0; j < lengthY; j++) {

      for (let i = 0; i < lengthX; i++) {

         color.x = 0;
         color.y = 0;
         color.z = 0;

        for (let s = 0; s < samplesPerPixel; s++) {

             u = (offSetX + i + Math.random()) / (canvasWidth - 1);
             v = (offSetY + j + Math.random()) / (canvasHeight - 1);




        color = Add(color,Ray_color(camera.Get_ray(u,v),world,20));


        }



        r = Clamp(Math.sqrt(color.x * scale), 0.0, 0.99);
        g = Clamp(Math.sqrt(color.y * scale), 0.0, 0.99);
        b = Clamp(Math.sqrt(color.z * scale), 0.0, 0.99);

 pixelData.push([r, g, b]);



      }


 }

 return pixelData;
}








   self.onmessage=function(e){



     importScripts("./Math.js",
                   "./Material.js",
                   "./Hittable.js",
                   "./Ray.js",
                   "./Camera.js",
                   "./workertask.js");







  const canvasWidth = e.data.canvasWidth,
  canvasHeight = e.data.canvasHeight,
  samplesPerPixel = e.data.samplesPerPixel;




  const world=objectToWorld(e.data.world);
  const offsets=findOffsets(e.data.id, e.data.maxWorkers, canvasWidth, canvasHeight);




const pixelData = getPixelData(offsets.offSetX, offsets.offSetY,
offsets.lengthX, offsets.lengthY, canvasWidth, canvasHeight, samplesPerPixel, world);






postMessage({
       'id'   :e.data.id ,
       'pixelData' : pixelData,
       'offSetX': offsets.offSetX ,
       'offSetY': offsets.offSetY ,
       'lengthX': offsets.lengthX,
       'lengthY': offsets.lengthY



});








     };
