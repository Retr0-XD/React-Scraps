var http = require('http');
const fs = require('fs');
const querystring = require('querystring');
var data = require('./source.json'); // Import the current JSON data

// Function to add data to the existing JSON and save it
function addData(data, body) {
    // Append new data to the existing array

    console.log(body, data)

    const updated = [...data, body];

    console.log(data)

    // Write the updated data back to the JSON file
    fs.writeFileSync('./source.json', JSON.stringify(updated,null, 3), 'utf-8');

}

// Create an HTTP server
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (req.method === 'GET') {
        // Serve the current JSON data
        res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Collect the incoming data
        });

        req.on('end', () => {
            try {
                // Parse the incoming data (expecting it to be JSON)
                const postData = JSON.parse(body); 

                // Add the parsed data to the source.json
                addData(data, postData);

                // Respond with the updated data
                //res.end(JSON.stringify(postData));

            } catch (err) {
                // Handle any errors, like invalid JSON
                console.error('Error parsing JSON:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        res.end('Send a POST request to this endpoint');
    }
}).listen(8081, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8081/');
