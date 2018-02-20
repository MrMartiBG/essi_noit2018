var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var buttonPressedCount = 0;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('buttonPressedCount', buttonPressedCount);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

	socket.on('buttonPressed', function(){
    buttonPressedCount++;
		console.log('button pressed', buttonPressedCount);
    io.emit('buttonPressedCount', buttonPressedCount);
 	});

});
