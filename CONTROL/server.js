var express = require('express'); // web server application
var http = require('http');				// http basics
var app = express();							// instantiate express server
var server = http.Server(app);		// connects http library to server
var io = require('socket.io')(server);	// connect websocket library to server
var serverPort = 8000;
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://hri.stanford.edu',
                           {port: 8134,
                            protocolId: 'MQIsdp',
                            protocolVersion: 3 });
var language = 'english'

// use express to create the simple webapp
app.use(express.static('public'));		// find pages in public directory


// Setup the MQTT connection and listen for messages
client.on('connect', function () {
  //Subscribe to topics
  client.subscribe('say');
  client.subscribe('can');  //CAN data in JSON
  client.subscribe('gps');
  console.log("Waiting for messages...");
  client.publish('say', 'Hello, I am a need finding machine');
});

// process the MQTT messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString());

  switch (topic) {
    case 'can':
      io.emit('can-msg', message.toString());
      break;
    case 'gps':
      io.emit('gps-msg', message.toString());
    default:
      io.emit('server-msg', message.toString());

  }
  //client.end();
});


// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
    console.log('a user connected');

    // if you get a message to send, send to the MQTT broker
    socket.on('msg', function(msg) {
        console.log(language + ', ' + msg);
        //send it to the mqtt broker
        client.publish(language, msg);
    });

    //change the language
    socket.on('lang', function(lang) {
      console.log(lang);
      language = lang;
    });

    socket.on('lights', function(msg) {
      console.log("RGB: " + msg);
      client.publish('lights', msg);
    })

    // if you get the 'disconnect' message, say the user disconnected
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});


// start the server and say what port it is on
server.listen(serverPort, function() {
    console.log('listening on *:%s', serverPort);
});
