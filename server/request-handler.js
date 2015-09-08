/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

  var responseObj = {};
  responseObj['results'] = [];

var requestHandler = function(request, response) {
    // Request and Response come from node's http module.
    //
    // They include information about both the incoming request, such as
    // headers and URL, and about the outgoing response, such as its status
    // and content.
    //
    // Documentation for both request and response can be found in the HTTP section at
    // http://nodejs.org/documentation/api/

    // Do some basic logging.
    //
    // Adding more logging to your server can be an easy way to get passive
    // debugging help, but you should always be careful about leaving stray
    // console.logs in your code.
    console.log("********************");



    if (request.method === "POST") {

        if (request.url === "/classes/messages" || request.url === "/classes/room1") {
            var statusCode = 201;
            var headers = defaultCorsHeaders;
            var body = '';

            request.on('data', function(data) {
                    console.log("receiving data....", body);
                    body += data;
                });
                //request ended, you can now do something with the data
            request.on('end', function() {
                responseObj['results'].push(JSON.parse(body));
                // request ended -> do something with the data. set the headers. 
                response.writeHead(statusCode, headers);
                //writing the data to json
                //response.write();
                //ending the response. 
                response.end(JSON.stringify(responseObj));

            });

            //headers['Content-Type'] = "text/plain";
        }

    } else {

    if (request.method === "GET") {
        var statusCode = 404;
        var headers = defaultCorsHeaders;
        console.log("request.url is ", request.url);
        if (request.url === "/classes/messages" || request.url==="/log" || request.url === "/classes" || request.url === "/classes/room1") {
            // The outgoing status.
            statusCode = 200;
            headers['Content-Type'] = "text/plain";
            response.writeHead(statusCode, headers);
           // response.write(JSON.stringify(responseObj));
            response.end(JSON.stringify(responseObj));
        }else{
          //For any other routes besides /classes/messages
            headers['Content-Type'] = "text/plain";
            response.writeHead(statusCode, headers);
            response.end();
            //response.write(JSON.stringify(responseObj));
        }

            

      }

    }

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
