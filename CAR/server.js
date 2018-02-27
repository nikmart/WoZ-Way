/*
server.js - CAR

Author: Niklas Martelaro (nmartelaro@gmail.com)

Purpose: This is the server for the WoZ Way in car system. It can send messages
back to the control interface as well as recieve messages from the control
interface. Theis messageing is handled using and MQTT server in a known
location.

The server subscribes to MQTT messages from the control interfcae and publishes
MQTT messages that will the control interface will listen to.

Usage: node server.js

Notes: You will need to specify what MQTT server you would like to use.
*/

//****************************** SETUP ***************************************//
// MQTT Setup
var mqtt   = require('mqtt');
var client = mqtt.connect('mqtt://hri.stanford.edu',
                           {port: 8134,
                            protocolId: 'MQIsdp',
                            protocolVersion: 3 });
// Text to speech setup
var say = require('say');
//****************************************************************************//

//********************** MQTT MESSAGES WITH ACTIONS **************************//
// Setup the socket connection and listen for messages
client.on('connect', function () {
  client.subscribe('say'); // messages from the wizard interface to speak out
  console.log("Waiting for messages...");

  // messages for testing
  client.publish('say', 'Hello, I am a need finding machine');
});

// Print out the messages and say messages that are topic: "say"
// NOTE: These voices only work on macOS
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString());

  // Say the message using Apple's Text to speech
  if (topic === 'say') {
    // use default voice in System Preferences - You can sent this yourself
    console.log('');
    say.speak(null, message.toString());
  }

  //client.end();
});
//****************************************************************************//

//********************** SIMULATED CAN DATA MESSAGES *************************//
setInterval(function(){
    //update with some random data every 200 ms
    client.publish('can', '{"name":"vss", "value":' +
      Math.floor(Math.random() * 90) +
      '}')
    client.publish('can', '{"name":"rpm", "value":' +
      Math.floor(Math.random() * 6000) +
      '}')
}, 200);
//****************************************************************************//
