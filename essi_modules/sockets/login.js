module.exports = function(socket,database){

	socket.authenticated = false;

	socket.register_user_fail = function register_user_fail(code){
		socket.emit('registration_fail', code);
		console.log('registration_fail', code);
		return code;
	}
	socket.register_user_successful = function register_user_successful(user){
		socket.authenticated = true;
		socket.username = user.username;
		socket.email = user.email;

		socket.emit('registration_successful');
		console.log('registration_successful', socket.username);
		
		return user;
	}
	socket.on('register_user', function(user){
		console.log('socket.on register_user', user);

		if(socket.authenticated) return socket.register_user_fail(0);

		if( user.username!=null  && user.username!='' &&
			user.password!=null   && user.password!='' &&
			user.email!=null      && user.email!='' ){
			
			database.register_user(user, function(err, results){
				if(err){
					return socket.register_user_fail(3);
				}else{
					return socket.register_user_successful(user);
				}
			});
		}else{
			return socket.register_user_fail(2);
		}
	});



	socket.login_user_fail = function login_user_fail(code){
		socket.emit('login_fail', code);
		console.log('login_fail', code);
		return code;
	}
	socket.login_user_successful = function login_user_successful(user){
		socket.authenticated = true;
		socket.username = user.username;
		socket.emit('login_successful');
		console.log('login_successful', socket.username);
		return user;
	}
	socket.on('login_user', function(user){
		console.log('socket.on login_user', user);

		if(socket.authenticated) return socket.login_user_fail(0);

		if( user.username!=null  && user.username!='' &&
				user.password!=null   && user.password!=''){
			database.fetch_user(user.username, function(err, results){
				if(err){
					return socket.login_user_fail(3);
				}else{
					if(results[0].password == user.password){
						return socket.login_user_successful(user);
					}else{
						return socket.login_user_fail(1);
					}
				}
			});
		}else{
			socket.login_user_fail(2);
		}
	});



	socket.logout_user_fail = function logout_user_fail(code){
		socket.emit('logout_fail', code);
		console.log('logout_fail', code);
		return code;
	}
	socket.logout_user_successful = function logout_user_successful(){
		socket.authenticated = false;
		socket.emit('logout_successful');
		console.log('logout_successful', socket.username);
		return true;
	}
	socket.on('logout_user', function(){
		console.log('socket.on logout_user', socket.username);
		if(!socket.authenticated){
			return socket.logout_user_fail(0);
		}else{
			return socket.logout_user_successful();
		}
	});

}