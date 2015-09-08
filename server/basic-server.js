/* Import node's http module: */
var express = require('express');
var cors = require('cors');
var app = express();
var http = require("http");
var handleRequest = require("./request-handler");
var url = require("url");
var path = require("path");
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(cors());

var responseObj = {};
//responseObj['results'] = [];
// looks up a file called "chatdata.txt"
var data = fs.readFileSync(path.join(__dirname, './', 'chatdata.txt'));
//1) Load the chat log if it exists
if (data){
  //we parse it, because it's stringified
  responseObj = JSON.parse(data);  
}else{
  // if there's no data, make an empty array.  
  responseObj['results'] = [];
}

var writeFile = function(content){
  var ourcontent = content;
    fs.writeFile(path.join(__dirname, './', 'chatdata.txt'), ourcontent, encoding='utf8', function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  console.log("we wrote to the file")

};

//In current versions of node you MUST specify an ABSOLUTE location
  //relative location: ../myfolder/file.txt
  //absolute: c:\myprojects\nodeproject\myfolder\file.txt

//2) **SAVE** the responseObj as its gets updated
//3) Try to do the loading asynchronously



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
  //everytime some posts, we want to write their data/message to the file. 
  // we are overwriting the whole file.  
  console.log(typeof request.body);
  
  responseObj.results.push(request.body);
  writeFile(JSON.stringify(responseObj));
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

