var request = require('request');

    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'fareez',
        text: 'what up?!',
        room: 'the lobby'}
    };

    request(requestParams, function(error, response, body) {
      console.log(body)
    });


    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'victor',
        text: 'what up 2.0',
        room: 'the lobby'}
    };

    request(requestParams, function(error, response, body) {
      console.log(body)
    });


    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Joe',
        text: 'More text',
        room: 'different stuff'}
    };

    request(requestParams, function(error, response, body) {
      console.log(body)
    });
