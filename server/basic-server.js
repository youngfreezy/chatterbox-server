/* Import node's http module: */
var express = require('express')
var app = express();
var http = require("http");
var handleRequest = require("./request-handler");
var url = require("url");
var path = require("path");
var bodyParser = require('body-parser')

app.use(app.router);

var options = {
    origin: '*', // default: '*' 
    method: 'GET,PUT,POST,DELETE,OPTIONS', // default: 'GET,PUT,POST,DELETE,HEAD,OPTIONS' 
    headers: 'Content-Type, Content-Length, accept' // default: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override' 
    //"access-control-allow-origin": "*",
    //"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    //"access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.

};
 
app.use(require('express-cors-options')(options));

var responseObj = {};
responseObj['results'] = [];

// all environments
app.get('/classes/messages', function(request, response) {
    response.send(JSON.stringify(responseObj));
});
app.get('/log', function(request, response) {
    response.send(JSON.stringify(responseObj));
});
app.get('/classes', function(request, response) {
    response.send(JSON.stringify(responseObj));
});
app.get('/classes/room1', function(request, response) {
    response.send(JSON.stringify(responseObj));
});

app.get('/*', function(request, response) {
    response.send(JSON.stringify(responseObj));
});

//TODO: posts

app.post('/classes/messages', bodyParser.json(), function(request, response) {
  // response.sendFile(path.join(__dirname, '../views', 'homepage.html'));
  console.log(typeof request.body);
  responseObj.results.push(request.body);
});

app.post('/classes/room1', bodyParser.json(), function(request, response) {
  responseObj.results.push(request.body);
  
});

app.post('/*', bodyParser.json(), function(request, response){
  responseObj.results.push(request.body);
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get("port"));

//1) bodyparser.json()
//2) OPTIONS






// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

