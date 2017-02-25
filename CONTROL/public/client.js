// JavaScript Document
var socket = io();
var RGB;

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
  socket.emit('lights', RGB); // send light color
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

function update(picker) {
    //document.getElementById('hex-str').innerHTML = picker.toHEXString();
    //document.getElementById('rgb-str').innerHTML = picker.toRGBString();

    // document.getElementById('rgb').innerHTML =
    //     Math.round(picker.rgb[0]) + ', ' +
    //     Math.round(picker.rgb[1]) + ', ' +
    //     Math.round(picker.rgb[2]);

    RGB = Math.round(picker.rgb[0]) + ',' +
         Math.round(picker.rgb[1]) + ',' +
         Math.round(picker.rgb[2])
    console.log(RGB);
}

function readEnglish(){
	lang = 'english';
  socket.emit('lang', lang);
}

function readFrench(){
	lang = 'french';
  socket.emit('lang', lang);
}

function readJapanese(){
	lang = 'japanese'
  socket.emit('lang', lang);
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
		case 'app_e':
			document.getElementById('APP_E').innerHTML = Math.round(canData.value * (100/59) - 3200/59);
			break;
		default:
			break;
	}
});



// function initMap() {
// 		var alpha = 0.4;
// 		var state = {lat: 0, lng: 0};
// 		var map = new google.maps.Map(document.getElementById('map'), {
// 				center: state,
// 				zoom: 15
// 		});
// 		var marker = new google.maps.Marker({
// 				position: state,
// 				map: map,
// 				title: 'Your Position'
// 		});
// 		socket.on('gps-msg', function(pos) {
//
// 				if (pos.lat === null || pos.lon === null) {
// 						return;
// 				}
// 				if (state.lat === 0 && state.lng === 0) {
// 						state.lat = pos.lat;
// 						state.lng = pos.lon;
// 				} else {
// 						state.lat = (1 - alpha) * state.lat + alpha * pos.lat;
// 						state.lng = (1 - alpha) * state.lng + alpha * pos.lon;
// 				}
// 				map.setCenter(state);
// 				marker.setPosition(state);
// 		});
// }

    //switch(json_msg.name) {
        // case 'CAN':
        //     console.log('speed: ', json_msg.value)
				// 	var speed = document.getElementById('CAN');
				// 	//This is the corerction factor for the Q50
				// 	correctedSpeed = Math.ceil(json_msg.value * 0.84);
    		// 		speed.innerHTML = correctedSpeed;
        //     break;

    //     case 'Status':
    //         console.log('status: ', json_msg.value);
		// 				var status = document.getElementById('ACCStatus');
		// 				status.innerHTML = json_msg.value;
		// 				// change the background color of the cell
		// 				if (json_msg.value == 'On') {
		// 					status.style.backgroundColor = "#00cc66"; //green
		// 				}
		// 				else {
		// 					status.style.backgroundColor = "#f8f8f8"; //grey
		// 				}
    //         break;
		//
		// case 'Brake':
		// 		console.log('brake: ', json_msg.value);
		// 		var brake = document.getElementById('Brake')
		// 		brake.innerHTML = json_msg.value;
		// 		// change the background color of the cell
		// 		if (json_msg.value == 1) {
		// 			brake.style.backgroundColor = "#ffff66"; //yellow
		// 		}
		// 		else {
		// 			brake.style.backgroundColor = "#f8f8f8"; //grey
		// 		}
		// 	  break;
		//
		// case 'Distance':
		// 		console.log('distance: ', json_msg.value);
		// 		var dist = document.getElementById('ICCDistance');
		// 		dist.innerHTML = json_msg.value;
		// 		break;
		//
		// case 'Indicator':
		// 		console.log('indicator: ', json_msg.value);
		// 		var engaged = document.getElementById('ICCEngaged');
		// 		//Change the color and say if engaged or not
		// 		if (json_msg.value){
		// 			engaged.innerHTML = "Engaged";
		// 			engaged.style.backgroundColor = "#00cc66"; //green
		// 		}
		// 		else {
		// 			engaged.innerHTML = "-";
		// 			engaged.style.backgroundColor = "#f8f8f8"; //grey
		// 		}
		// 		break;
		//
		// case 'Speed2': //ICC set speed
		// 		console.log('set speed: ', json_msg.value);
		// 		var set = document.getElementById('ICCSetSpeed');
		// 		set.innerHTML = json_msg.value - 1; //there is an offset of 1 on this speed
		// 		break;

		// case 'can': //ICC above set speed, usually means driver accelerating
		// 		console.log('above speed: ', json_msg.value);
		// 		var set = document.getElementById('CAN');
		// 		set.innerHTML = json_msg.value;
		// 		break;
    // }
