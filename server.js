var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = require('./socket.js');
var mysql = require('mysql');
var db_user = require('./config/database_user.js');
var connection = require('./config/configure_database.js')(mysql,db_user);
var db = require('./database.js')(connection);

// //// test:
//   var user={
//     "user_name":"abcd",
//     "password":"12345678",
//     "email":"abcd@martin.bg"
//   }
//   console.log("server.js - db.register(user, function (err, results)");
//   db.register(user, function (err, results){
//     if (err){
//       console.log("server.js - if");
//       console.log("err adding user");
//       // console.log("err", err);
//       // console.log('results', results);
//       return false;
//     }else{
//       console.log("server.js - else");
//       console.log("succ adding user");
//       // console.log("err", err);
//       // console.log('results', results);
//       return true;
//     }
//   });
// //// end

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/favicon.ico', function(req, res){
  res.sendFile(__dirname + '/client/favicon.ico');
});
app.get('/inline.318b50c57b4eba3d437b.bundle.js', function(req, res){
  res.sendFile(__dirname + '/client/inline.318b50c57b4eba3d437b.bundle.js');
});
app.get('/main.921f4d1d8212caade0e4.bundle.js', function(req, res){
  res.sendFile(__dirname + '/client/main.921f4d1d8212caade0e4.bundle.js');
});
app.get('/polyfills.01a6a20f81fe7bf9e073.bundle.js', function(req, res){
  res.sendFile(__dirname + '/client/polyfills.01a6a20f81fe7bf9e073.bundle.js');
});
app.get('/styles.ac89bfdd6de82636b768.bundle.css', function(req, res){
  res.sendFile(__dirname + '/client/styles.ac89bfdd6de82636b768.bundle.css');
});

var data_array = [];

io.on('connection', socket);

http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});