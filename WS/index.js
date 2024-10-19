const http = require('http');
const port = 3000;

const fs = require('fs');



const express = require('express');
const app = express();


app.use((req, res, next)=>{

    console.log(req.method, req.path, req.statusCode, req.statusMessage);

    next();
});



app.get('^/$|^/index.html', (req, res)=>{

    res.status(200);

    res.send("Hello World");
});

app.get('/hi(.nigga)?', (req, res)=>{
    
    res.send("Hi there");
})

app.get('/*', (req, res)=>{

    res.send("404");
    res.status(404);
})

app.listen(port, (error)=>{

    console.log('listening on port 3000');
})


// const server = http.createServer((req, res) => {
    
//     res.writeHead(200, {'Content-Type': 'text/html'});

//     fs.readFile('index.html', (err, data) => {
    
//         if(err){

//             res.writeHead(404);
//             res.write("page not found");

//         }else{

//             res.write(data);
//         }

//         res.end();
//     })
// })


// server.listen(port, (error)=>{

//     if(error){

//         console.log(error);
//     }else{

//         console.log(`Server is running at http://localhost:${port}`);
//     }
// })