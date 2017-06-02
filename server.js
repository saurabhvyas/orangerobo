 
var express = require('express') , bodyParser = require('body-parser');
var app = express(),cors = require('cors');

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var url = require('url');
var cmd=require('node-cmd');
var multer  = require('multer')

var rpio = require('rpio');
var morgan = require('morgan');
//app.use(morgan('combined'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules'));  

app.use(bodyParser.json());



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'audio.wav' );
  }
})



app.get('/',function(req,res) { 

res.send(' Hello from pi3 - 2');


});
var upload = multer({ storage: storage  })

app.post('/' ,upload.any() , function(req,res) {
//res.send('post received at /speech ');

console.log('post received');

res.send('coool');

playAudio();


});



rpio.init({mapping: 'gpio'});
rpio.open(12, rpio.OUTPUT, rpio.LOW); // pwm a



rpio.open(6, rpio.OUTPUT, rpio.LOW); // motor a pin 1
rpio.open(5, rpio.OUTPUT, rpio.LOW); // motor a pin 2

rpio.open(20, rpio.OUTPUT, rpio.LOW);  // standby


rpio.open(13, rpio.OUTPUT, rpio.LOW); // pwm b
rpio.open(9, rpio.OUTPUT, rpio.LOW); // motor b pin 1
rpio.open(10, rpio.OUTPUT, rpio.LOW);  // motor b pin 2

var active_clients = 0;


//cmd.run('amixer cset numid=1 10%');

playAudio = function() {

//var cmdstring = 'echo -e  "connect 30:21:BC:8D:48:6B \nquit" | bluetoothctl ' ;

//cmdstring = cmdstring.replace(/[\\$'"]/g, "\\$&");
//console.log(cmdstring);


//cmd.run('amixer cset numid=1 60%');   // make sure sound is low so ears dont explode
//cmd.get('pulseaudio --start',function(err,data,std){

//console.log('err' + err );
//console.log('data ' + data);
//console.log('std' + std);

  // this is required before bluetoothctl for some weird reason 
/*cmd.get(cmdstring,function(err,data,stderr){

console.log('error2' + err);
console.log('data2' + data);
console.log('stderr2'  + stderr);


}); // assuming device is already paired and trusted

*/
const exec = require('child_process').exec;
const testscript = exec('sh bluetooth_connect.sh');

testscript.stdout.on('data', function(data){
    console.log('data' + data); 
  //  cmd.run('pacmd "set-default-sink bluez_sink.30_21_BC_8D_48_6B" ');
   // cmd.run('aplay /home/pi/saurabh/robot/uploads/audio.wav');
    // sendBackInfo();
});

testscript.stderr.on('data', function(data){
    console.log('errdata' + data);
    // triggerErrorStuff(); 
});






}

//playAudio();


setInterval(function(){


rpio.write(20, rpio.LOW);

if (active_clients === 0 ) {
console.log('no active clients');

		 	 cmd.get(
        `cd /home/pi/rpicam  && ./stop.sh`,
        function(err, data, stderr){
           // console.log('results',data);
            // console.log('err' + err);
             
        }
    );
    
    		 	
  	
  //	cmd.run('cd rpicam');
  //	cmd.run('./stop.sh');
  	
}

} ,10000)



app.use(cors());

var counter_f=0;
var counter_b=0;
var counter_l=0;
var counter_r=0;





io.on('connection', function(client){
	
	active_clients=active_clients + 1;
	console.log(' active_clients : ' + active_clients);
	
	if ( active_clients === 1 ) {
	
	//md.run('cd rpicam');
	//md.run('./start.sh');
	 
		 	 cmd.get(
        'cd /home/pi/rpicam  && ./start.sh',
        function(err, data, stderr){
           // console.log('results',data);
           //  console.log('err' + err);
             
        }
    );
    
    
 
	
	}
	
	
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
  client.on('disconnect', function(){
  	
  	active_clients = active_clients - 1 ;

  	
	  
  });
});



server.listen(5000,function () {

console.log('listening on 5000');


});






