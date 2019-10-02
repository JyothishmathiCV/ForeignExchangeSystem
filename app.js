var http = require('http');
var url = require("url");
var express = require("express");
var app = express();
var fs = require('fs');

// Create a server object: 
http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write("This is not a useful page.");
            response.end();
            break;
        case '/ForexSys.html':
            fs.readFile(__dirname + path, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
    // The server object listens on port 8080 
}).listen(8082);

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function (req, res) {

//     if (req.method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         fs.createReadStream("./public/form.html", "UTF-8").pipe(res);
//     } else if (req.method === "POST") {
    
//         var body = "";
//         req.on("data", function (chunk) {
//             body += chunk;
//         });

//         req.on("end", function(){
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(body);
//         });
//     }

// }).listen(3000);