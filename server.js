var    express = require('express')
var        app = express();
var       http = require('http').Server(app);
var         io = require('socket.io')(http);
var      mysql = require('mysql');
var    db_user = require('./config/database_user.js');
var connection = require('./essi_modules/configure_database.js')(mysql,db_user);
var   database = require('./essi_modules/database.js')(connection);
var     socket = require('./essi_modules/sockets/socket.js')(database);

//// test:
  var car={
    "owner": "test",
	"year": "2002",
	"manufacturer": "Toyota",
	"model": "Supra"
  }
  console.log("server.js - database.register_car(car, function (err, results)...");
  database.register_car(car, function (err, results){
    if (err){
    	console.log("fail reg car",err);
    }else{
    	console.log("succ reg car",results);
    }
  });
  console.log("server.js - database.fetch_cars(car[\"owner\"], function (err, results)...");
  database.fetch_cars(car["owner"], function (err, results){
    if (err){
    	console.log("fail fetch car",err);
    }else{
    	console.log("succ fetch car",results);
    }
  });

  var today = new Date();
  var modification={
    "car_id": 1,
	"date": today,
	"type": "Breaks",
	"description": "New 'Brembo' breaks."
  }
  console.log("server.js - database.register_car(car, function (err, results)...");
  database.register_modification(modification, function (err, results){
    if (err){
    	console.log("fail reg modification",err);
    }else{
    	console.log("succ reg modification",results);
    }
  });
  console.log("server.js - database.fetch_modifications(modification[\"car_id\"], function (err, results)...");
  database.fetch_modifications(modification["car_id"], function (err, results){
    if (err){
    	console.log("fail fetch modification",err);
    }else{
    	console.log("succ fetch modification",results);
    }
  });
//// end

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/test.html');
});
app.use(express.static('public'));

io.on('connection', socket.handler);

http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});
