module.exports = function(database){

	this.handler = function handler(socket){
	  console.log('user connected', socket.id);
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
	    console.log('socket.on register user', user);
	    if(socket.authenticated) return socket.register_user_fail(0);
	    if( user.user_name!=null  && user.user_name!='' &&
	        user.password!=null   && user.password!='' &&
	        user.email!=null      && user.email!='' ){
	      database.register_user(user, function(err, results){
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
	    console.log('socket.on login user', user);
	    if(socket.authenticated) return socket.login_user_fail(0);
	    if( user.user_name!=null  && user.user_name!='' &&
	        user.password!=null   && user.password!=''){
	      database.login_user(user, function(err, results){
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
	    console.log('socket.on logout user', socket.user_name);
	    if(!socket.authenticated){
	      return socket.logout_user_fail(0);
	    }else{
	      socket.logout_user_successful();
	    }
	  });

	  socket.on("new-message", function(msg){
	    console.log("new-message", msg);
	  });

	}

	return this;
}