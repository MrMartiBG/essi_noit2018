var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var data_array = [];

io.on('connection', function(socket){
  console.log('a user connected');

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

});
