# WoZ-Way Hello World

This project contains sample code for getting started sending messages back and
forth to the car using a wizard control interface.

## Requirements
### Car
1. An Apple computer running macOS (required for use with Apple text to speech system)

2. NodeJS 4+

3. External speaker for text to speech

4. A high-speed 4G cellular router

### Control
1. A server with NodeJS and avialble port open (default port is 8000)

2. A computer with a modern web-browser

3. A high speed internet conenction

### Message Broker
WoZ Way used MQTT, a popular publish/subscribe messaging protocol to communicate messages between the car and the control interface. This is done so that only the MQTT broker IP needs to be known. I use a popular and free MQTT broker called Mosquitto [https://mosquitto.org]. You can set up Mosquitto on a Unix based server fairly easily. 

## Instructions
1. Make sure you have NodeJS installed on both the CAR computer and the CONTROL server. If you are on a Mac and
use Homebrew [https://brew.sh], you can use `brew install node`

2. Navigate to the **CONTROL** directory and run `npm install`

3. In the **CONTROL** directory, run `node server.js`

4. Navigate to the **CAR** directory and run `npm install`

5. In the **CAR** directory, run `node server.js`

6. In a web browser, navigate to `localhost:8000` - this is where the control
interface is. You should be able to see live data coming back from the car. You
should also be able to send messages using the message input for custom messages
of from the Common Questions area by clicking the buttons.

7. (Additional) If you can serve the control interface from a known server with a public IP, then you can navigate to `<your.server.ip>:8000`

### MQTT Setup
The sample code provided points to an MQTT broker running on a server at Stanford's Center for Design Research. You can use this for testing, however, for your own work, please setup your own MQTT broker and change the ip and port in botht he CAR and CONTROL code to point to your own broker.

### Changing Vocies on macOS

You can set the default voice in your System Preferences -> Accessibilty -> Speech. I recommend you use voice with High Quality options.

The system will work with any language provided by Apple. Just choose a voice for your prefered langueage, for example Kyoko for Japanese, and then send messages in Japanese from the wizard control interface.

## Citation
If you are interested to learn more about the WoZ Way system and it's applications for remote interaction prototyping and observation, please see: https://dl.acm.org/citation.cfm?id=2998293

If you use this code of the method for your own research, please cite:

Nikolas Martelaro and Wendy Ju. 2017. WoZ Way: Enabling Real-time Remote Interaction Prototyping & Observation in On-road Vehicles. In Proceedings of the 2017 ACM Conference on Computer Supported Cooperative Work and Social Computing (CSCW '17). ACM, New York, NY, USA, 169-182. DOI: https://doi.org/10.1145/2998181.2998293

```tex
@inproceedings{Martelaro:2017:WWE:2998181.2998293,
 author = {Martelaro, Nikolas and Ju, Wendy},
 title = {WoZ Way: Enabling Real-time Remote Interaction Prototyping \&\#38; Observation in On-road Vehicles},
 booktitle = {Proceedings of the 2017 ACM Conference on Computer Supported Cooperative Work and Social Computing},
 series = {CSCW '17},
 year = {2017},
 isbn = {978-1-4503-4335-0},
 location = {Portland, Oregon, USA},
 pages = {169--182},
 numpages = {14},
 url = {http://doi.acm.org/10.1145/2998181.2998293},
 doi = {10.1145/2998181.2998293},
 acmid = {2998293},
 publisher = {ACM},
 address = {New York, NY, USA},
 keywords = {design methods, ethnography, interaction design, prototyping, wizard of oz},
} 
```


