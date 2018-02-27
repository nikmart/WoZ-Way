/*
client.js - CONTROL

Author: Niklas Martelaro (nmartelaro@gmail.com)

Purpose: This is the client side interaction code. I handles capturing data from
the message input areas, button clicks, and dynamic data displays on the
webpage.

The client communicates with the CONTROL server using WebSockets.

Usage: Automatically served from the CONTROL server.

Notes: You will need to specify what the WebSocket topics. They can be the same
or different from the MQTT topics.
*/

// JavaScript Document
var socket = io();

function sendOnEnter(){
	// send on enter key
	if (event.keyCode == 13){
		sendMsg();
	}
}

function sendMsg(){
	// get and send the messge to the remote interface
	var msg = document.getElementById("message").value;
	console.log(msg);
	socket.emit('say', msg);  //send the message to ther server


	// add the question to the list
	addQuestion(msg);

	// reset the message window
	resetMsg();
	}

function resetMsg(){
	document.getElementById("message").value = '';
	}

function addQuestion(msg){
	// create a new line with the questions at the top of the list
	var para = document.createElement("p");
	var node = document.createTextNode(msg);
	para.appendChild(node);

	var btn = document.createElement("BUTTON");
	var btnReplay = document.createTextNode("Replay"); // Create a text node
	btn.onclick = function(){replayMsg(msg)};
	btn.appendChild(btnReplay);

	para.appendChild(btn);
	var element = document.getElementById("questions");
	element.prepend(para);
}

function replayMsg(msg){
	console.log(msg);
	socket.emit('say', msg);  //send the message to ther server
}

function playMsg(msgID){
	var msg = document.getElementById(msgID).innerHTML;
	console.log(msg);
	socket.emit('say', msg);  //send the message to ther server
}

// read the data from the message that the server sent and change the
// display based on the message
socket.on('can-msg', function(msg) {
	canData = JSON.parse(msg);
	console.log(canData.name);

	switch (canData.name) {
		case 'vss': //vehicle speed
			document.getElementById('Speed').innerHTML = canData.value;
			break;

		case 'rpm':
			rpm = Math.round(canData.value);
			if (rpm) {
				document.getElementById('RPM').style.backgroundColor = "Orange";
			}
			else {
				document.getElementById('RPM').style.backgroundColor = "LightGreen";
			}
			document.getElementById('RPM').innerHTML = Math.round(canData.value);
			break;

		default:
			break;
	}
});
