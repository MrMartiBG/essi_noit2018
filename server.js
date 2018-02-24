var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

io.on('connection', function(socket){
  console.log('user connected', socket.id);
  console.log('user remoteAddress',socket.request.connection.remoteAddress);
  socket.authenticated = false;

  socket.register_user_fail = function register_user_fail(code){
    socket.emit('registration fail');
    console.log('registration fail', code);
    return code;
  }
  socket.register_user_successful = function register_user_successful(user){
    socket.authenticated = true;
    socket.user_name = user.user_name;
    socket.emit('registration successful');
    console.log('registration successful', socket.user_name);
    return user;
  }

  socket.login_user_fail = function login_user_fail(code){
    socket.emit('login fail');
    console.log('login fail', code);
    return code;
  }
  socket.login_user_successful = function login_user_successful(user){
    socket.authenticated = true;
    socket.user_name = user.user_name;
    socket.emit('login successful');
    console.log('login successful', socket.user_name);
    return user;
  }

  socket.logout_user_fail = function logout_user_fail(code){
    socket.emit('logout fail');
    console.log('logout fail', code);
    return code;
  }
  socket.logout_user_successful = function logout_user_successful(){
    socket.authenticated = false;
    socket.emit('logout successful');
    console.log('logout successful', socket.user_name);
    return true;
  }

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('register user', function(user){
    if(socket.authenticated) return socket.register_user_fail(0);
    console.log('socket.on register user', user);
    if( user.user_name!=null  && user.user_name!='' &&
        user.password!=null   && user.password!='' &&
        user.email!=null      && user.email!='' ){
      db.register_user(user, function(err, results){
        if(err){
          socket.register_user_fail(2);
        }else{
          socket.register_user_successful(user);
        }
      });
    }else{
      socket.register_user_fail(3);
    }
  });

  socket.on('login user', function(user){
    if(socket.authenticated) return socket.login_user_fail(0);
    console.log('socket.on login user', user);
    if( user.user_name!=null  && user.user_name!='' &&
        user.password!=null   && user.password!=''){
      db.login_user(user, function(err, results){
        if(err){
          socket.login_user_fail(2);
        }else{
          if(results[0].password == user.password){
            socket.login_user_successful(user);
          }else{
            socket.login_user_fail(1);
          }
        }
      });
    }else{
      socket.login_user_fail(3);
    }
  });

  socket.on('logout user', function(){
    if(!socket.authenticated){
      return socket.logout_user_fail(0);
    }else{
      socket.logout_user_successful();
    }
    console.log('socket.on logout user', socket.user_name);
  });

  socket.on("new-message", function(msg){
    console.log("new-message", msg);
  });

});

http.listen(3030, function(){
  console.log('Server started! At http://localhost:3030');
});