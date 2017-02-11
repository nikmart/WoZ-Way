// MQTT Setup
var mqtt   = require('mqtt');
var client = mqtt.connect('mqtt://hri.stanford.edu',
                           {port: 8134,
                            protocolId: 'MQIsdp',
                            protocolVersion: 3 });
// Text to speech setup
var say = require('say');

// OBD Setup (used for standard OBD-II devices like the )
var OBDReader = require('serial-obd');
var options = {};
options.baudrate = 115200;
var serialOBDReader = new OBDReader("/dev/tty.usbserial-113010768803", options);
var dataReceivedMarker = {};
var pollingRate = 250; //polling rate in milliseconds

serialOBDReader.on('dataReceived', function (data) {
    console.log(data);
    dataReceivedMarker = data;
    // send the data to the MQTT server
    client.publish('can', JSON.stringify(data));
});

serialOBDReader.on('connected', function (data) {
    this.addPoller("vss"); //vehicles speed
    //this.addPoller("rpm"); //engine RPM
    //this.addPoller("throttlepos"); //Absolute throttle position [1 - 100]
    // this.addPoller("temp");
    // this.addPoller("load_pct");
    // this.addPoller("map");
    // this.addPoller("frp");

    this.startPolling(pollingRate); //Polls all added pollers at given rate.
});

serialOBDReader.connect();

// Setup the socket connection and listen for messages
client.on('connect', function () {
  client.subscribe('say');
  client.subscribe('english');
  client.subscribe('french');
  client.subscribe('japanese');
  client.subscribe('test');
  console.log("Waiting for messages...");

  testingMsgs();
});

// Print out the messages and say messages that are topic: "say"
// NOTE: These voices only work on macOS
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString());

  // Say the message
  if (topic === 'say') {
    // use default voice in System Preferences
    console.log('');
    say.speak(null, message.toString());
  }

  if(topic === 'english') {
    //use the english voice to say messages. Note: I am using the Samantha voice
    //Also note that you must send english messages for this to work well
    console.log('english');
    say.speak('Samantha', message.toString());
  }

  if(topic === 'french') {
    //use the French voice to say messages. Note: I am using the Audrey voice
    //Also note that you must send french messages for this to work well
    console.log('french');
    say.speak('Audrey', message.toString());
  }

  if(topic === 'japanese') {
    //use the Japanese voice to say messages. Note: I am using the Kyoko voice
    //Also note that you must send japanese messages for this to work well
    console.log('japanese');
    say.speak('Kyoko', message.toString());
  }

  //client.end();
});

function testingMsgs(){
  // messages for testing
  client.publish('test', 'MQTT Connected');
  client.publish('say', 'Hello, I am a need finding machine');
}

/* -- Serial Comm: Useful for connecting to microcontrollers like Arduino -- //
var serialport = require("serialport");
var serialPort = new SerialPort("/dev/ttyUSB0", {
  parser: serialport.parsers.readline("\0")
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    client.publish('can', data);
  });
});
*/
