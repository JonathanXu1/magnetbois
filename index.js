//Setup
const SerialPort = require('serialport');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Start server
app.use("/public", express.static(__dirname + "/public"));
var port = 8080;
http.listen(port, function(){
  console.log("App started");
});

//response
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

//Listen for connection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//Serial
const Readline = SerialPort.parsers.Readline;
const seralPort = new SerialPort("COM3", {
    baudRate: 115200
});
const parser = new Readline();
seralPort.pipe(parser);
parser.on('data', function(data){
  console.log(data);
  io.emit('data', data);
});
seralPort.write('ROBOT PLEASE RESPOND\n');
