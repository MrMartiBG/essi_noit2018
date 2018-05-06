var     express = require('express');
var         app = express();
var        http = require('http').Server(app);
var          io = require('socket.io')(http);
var       mysql = require('mysql');

var  nodemailer = require('nodemailer');
var  email_user = require('./config/email_user.js');
var transporter = nodemailer.createTransport(email_user);

var     db_user = require('./config/database_user.js');
var    database = require('./essi_modules/database.js')(mysql,db_user);
var      socket = require('./essi_modules/socket.js')(database,transporter);


var port = 3030;

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

app.use(express.static('public'));

io.on('connection', socket.on_connection);

http.listen(port, function(){
  console.log('Server started! At http://localhost:' + port);
});
