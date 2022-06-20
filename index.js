const http = require('http');
const fs = require('fs');
const qs = require('qs');

const requestListener = function (req, res) {
    if(req.method == 'GET') {
        fs.readFile(__dirname + '/index.html', (err,data) =>{
            res.writeHead(200);
            res.end(data);
        })
    }
    else if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            let data = qs.parse(body)
            console.log(data);
            res.writeHead(200);
            res.end(JSON.stringify(data));
        })
    }
}

const server = http.createServer(requestListener);
server.listen(8080);