let http = require('http');
let fs = require('fs');
const path = require('path');

const PORT=8080;




const loadAndStream = (filePath, mineType, res) => {
    const fileStream = fs.createReadStream(filePath, "UTF-8");
    res.writeHead(200, {"Content-Type": mineType});
    fileStream.pipe(res);
}


http.createServer(function (req, res){

  const relativeFilePath =req.url.slice(1,req.url.length);
  const fileType =req.url.slice(req.url.search(/\.[a-z0-9]*$/)+1,req.url.length);


    if(fileType === ".html"||fileType == "/"){ 
        const filePath = path.join(__dirname, 'index.html');
        loadAndStream(filePath, 'text/html', res)
    }
    if(fileType=== 'css'){
        const filePath = path.join(__dirname, relativeFilePath );
        loadAndStream(filePath, 'text/css', res);
    }
    if(fileType=== 'js'){
        const filePath = path.join(__dirname, relativeFilePath );
        loadAndStream(filePath, 'text/javascript', res)
    }
}).listen(PORT);
