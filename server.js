 
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
    cb(null, 'audio.wav')
  }
})


var upload = multer({ storage: storage  })


rpio.init({mapping: 'gpio'});
rpio.open(12, rpio.OUTPUT, rpio.LOW); // pwm a



rpio.open(6, rpio.OUTPUT, rpio.LOW); // motor a pin 1
rpio.open(5, rpio.OUTPUT, rpio.LOW); // motor a pin 2

rpio.open(20, rpio.OUTPUT, rpio.LOW);  // standby


rpio.open(13, rpio.OUTPUT, rpio.LOW); // pwm b
rpio.open(9, rpio.OUTPUT, rpio.LOW); // motor b pin 1
rpio.open(10, rpio.OUTPUT, rpio.LOW);  // motor b pin 2

var active_clients = 0;

setInterval(function(){



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

} ,5000)



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

app.post('/speech' ,upload.any() , function(req,res) {
res.send('post received at /speech ');



});


server.listen(5000,function () {

console.log('listening on 5000');


});






