var    express = require('express');
var        app = express();
var       http = require('http').Server(app);
var         io = require('socket.io')(http);
var      mysql = require('mysql');

var    db_user = require('./config/database_user_new.js');
var   database = require('./essi_modules_new/database.js')(mysql,db_user);
var     socket = require('./essi_modules_new/socket.js')(database);

var port = 3030;

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/test.html');
});
app.use(express.static('public'));

io.on('connection', socket.on_connection);

http.listen(port, function(){
  console.log('Server started! At http://localhost:' + port);
});
