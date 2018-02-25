var    express = require('express')
var        app = express();
var       http = require('http').Server(app);
var         io = require('socket.io')(http);
var      mysql = require('mysql');
var    db_user = require('./config/database_user.js');
var connection = require('./config/configure_database.js')(mysql,db_user);
var   database = require('./database.js')(connection);
var     socket = require('./socket.js')(database);

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/test.html');
});
app.use(express.static('client'));

io.on('connection', socket.handler);

http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});