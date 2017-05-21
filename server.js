 
var express = require('express') , bodyParser = require('body-parser');
var app = express(),cors = require('cors');

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var url = require('url');


var rpio = require('rpio');
var morgan = require('morgan');
//app.use(morgan('combined'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules'));  

app.use(bodyParser.json());




rpio.init({mapping: 'gpio'});
rpio.open(12, rpio.OUTPUT, rpio.LOW); // pwm a



rpio.open(6, rpio.OUTPUT, rpio.LOW); // motor a pin 1
rpio.open(5, rpio.OUTPUT, rpio.LOW); // motor a pin 2

rpio.open(20, rpio.OUTPUT, rpio.LOW);  // standby


rpio.open(13, rpio.OUTPUT, rpio.LOW); // pwm b
rpio.open(9, rpio.OUTPUT, rpio.LOW); // motor b pin 1
rpio.open(10, rpio.OUTPUT, rpio.LOW);  // motor b pin 2





app.use(cors());

io.on('connection', function(client){
  client.on('test', function(data){
	
	console.log(data)
	
	switch(data){
case 'f':

rpio.write(20, rpio.HIGH);
//rpio.pwmSetData(20, 255);
//rpio.write(27, rpio.LOW);
rpio.write(6, rpio.LOW);
rpio.write(10, rpio.LOW);
rpio.write(5, rpio.HIGH);
rpio.write(9, rpio.HIGH);
//rpio.write(4, rpio.HIGH);
rpio.write(12, rpio.HIGH);
rpio.write(13, rpio.HIGH);


break;

case 'b':

rpio.write(20, rpio.HIGH);
//rpio.pwmSetData(20, 255);
//rpio.write(27, rpio.LOW);
rpio.write(5, rpio.LOW);
rpio.write(9, rpio.LOW);
rpio.write(6, rpio.HIGH);
rpio.write(10, rpio.HIGH);
//rpio.write(4, rpio.HIGH);
rpio.write(12, rpio.HIGH);
rpio.write(13, rpio.HIGH);

break;

case 'l':

 //cmd.run('aplay -D default saurabh/audio/blue.wav');

//rpio.write(12, rpio.LOW);
//rpio.write(2, rpio.LOW);

//rpio.write(3, rpio.HIGH);
//rpio.write(18, rpio.HIGH);
rpio.write(20, rpio.HIGH);
//rpio.pwmSetData(20, 255);
//rpio.write(27, rpio.LOW);
rpio.write(6, rpio.LOW);
rpio.write(9, rpio.LOW);
rpio.write(5, rpio.HIGH);
rpio.write(10, rpio.HIGH);
//rpio.write(4, rpio.HIGH);
rpio.write(12, rpio.HIGH);
rpio.write(13, rpio.HIGH);

break;

case 'r':

rpio.write(20, rpio.HIGH);
//rpio.pwmSetData(20, 255);
//rpio.write(27, rpio.LOW);
rpio.write(5, rpio.LOW);
rpio.write(10, rpio.LOW);
rpio.write(6, rpio.HIGH);
rpio.write(9, rpio.HIGH);
//rpio.write(4, rpio.HIGH);
rpio.write(12, rpio.HIGH);
rpio.write(13, rpio.HIGH);

break;

case 's':

rpio.write(20, rpio.LOW);

break;
	
	
	}
//	console.log('data arrived');
	
	
	  
  });
  client.on('disconnect', function(){});
});


server.listen(5000,function () {

console.log('listening on 5000');


});






