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
	socket.emit('msg', msg);  //send the message to ther server


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
	element.appendChild(para);
}

function replayMsg(msg){
	console.log(msg);
	socket.emit('msg', msg);  //send the message to ther server
}

function playMsg(msgID){
	var msg = document.getElementById(msgID).innerHTML;
	console.log(msg);
	socket.emit('msg', msg);  //send the message to ther server
}

// read the data from the message that the server sent and change the
// display based on the message
// message should have a name, value, and date
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
