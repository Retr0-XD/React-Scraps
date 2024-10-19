const express = require('express')
const app = express()
const port = 3000
var data = require('./data.json')
const bodyparser = require('body-parser')
const fs = require('fs')
const cors = require('cors')


app.use(express.json())
app.use(bodyparser.text())
app.use(cors())

function appendData(theta){

    data = JSON.parse(fs.readFileSync('data.json'));

    theta = {id: data.data.length + 1, ...theta} 
    const updated = [...data.data, theta]
    
    fs.writeFileSync('./data.json', JSON.stringify({data: updated}, null, 2));
}


function retriveData(xid, body){

   datac = JSON.parse(fs.readFileSync('data.json'));

    body = {id: parseInt(xid), ...body}
    
   for(let datax in datac.data){

         if(datac.data[datax].id==xid){

            datac.data[datax] = body;
            fs.writeFileSync('./data.json', JSON.stringify({data: datac.data}, null, 2));
            return;
         }    
   }


}


app.post('/posts',  function (req, res) {

   appendData(req.body); 
    res.status(201)
    res.send('Posted Successfully')
})


app.put('/posts/:id', (req, res)=>{

    const {id} = req.params
    
    retriveData(id, req.body);

    res.send('Updated Successfully')
})

app.get('/posts',(req, res)=>{

    res.send(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))