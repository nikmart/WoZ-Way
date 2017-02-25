import serial
import time
import paho.mqtt.client as mqtt

mqttc = mqtt.Client(protocol = mqtt.MQTTv31)
mqttc.connect("hri.stanford.edu", 8134, 60)

# setup the USB GPS serial port
ser = serial.Serial()
ser.port = "/dev/tty.usbserial"
ser.baudrate = 4800
ser.timeout = 1
ser.open()

# setup the csv file to save the data
#studyName = 'test'
#f = open('gpsLog_' + studyName + '_' +  str(time.time()) + '.csv', 'w')
print "Serial open!"

while True:
	gpsData = ser.readline()
	# log the $GPRMC lines - these provide the following data [http://aprs.gids.nl/nmea/#rmc]
	# $GPRMC,hhmmss.ss,A,llll.ll,a,yyyyy.yy,a,x.x,x.x,ddmmyy,x.x,a*hh
	# 	= UTC of position fix
	#	= Data status (V=navigation receiver warning)
	#	= Latitude of fix
	#	= N or S
	#	= Longitude of fix
	#	= E or W
	#	= Speed over ground in knots
	#	= Track made good in degrees True
	#	= UT date
	#	= Magnetic variation degrees (Easterly var. subtracts from true course)
	#	= E or W
	#	= Checksum
	if gpsData[0:6] == '$GPGGA': #use GGA for google maps use
		# log the system timestamp (unix) an then the data
		#f.write(str(time.time()) + ',' + gpsData)
		#print str(time.time()) + ',' + gpsData
		print gpsData
		mqttc.publish("can",gpsData)

f.close()
