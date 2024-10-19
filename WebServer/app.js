var http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
  
    response.writeHead(200, {'Content-Type': 'text/html'});

   if(request.url === '/'){
    response.end(fs.readFileSync('./assets/home.html'));  
   }else if(request.url === '/about'){
    response.end(fs.readFileSync('./assets/about.html'));
  }else{
    response.statusCode = 404;
    response.end(fs.readFileSync('./assets/404.html'));
  }
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');

