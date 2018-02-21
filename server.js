var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var db_user = require('./config/database_user.js');
var connection = require('./config/configure_database.js')(mysql,db_user);
var db = require('./database.js')(connection);

//test:
  var today = new Date();
  var user={
    "email":"ab@martin.bg",
    "user_name":"ab",
    "password":"12345678",
    "created":today,
    "modified":today
  }
  db.register(user);
//end

http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var data_array = [];

io.on('connection', function(socket){
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('setData', function(index, data){
    data_array[index] = data;
    console.log("data_array[" + index + "] = " + data + ";");
  });

  socket.on('getData', function(index){
    socket.emit('reciveData', index, data_array[index]);
    console.log("socket.io('reciveData', " + index + ", " + data_array[index] + ");");  
  });

  socket.on("new-message", function(msg){
    console.log("new-message", msg);
  });

});
