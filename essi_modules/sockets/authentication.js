module.exports = function(socket,database){

	socket.register_user_fail = function register_user_fail(code){
		socket.emit('register_user_fail', code);
		console.log('register_user_fail', code);
		return code;
	}
	socket.register_user_successful = function register_user_successful(user){
		socket.authenticated = true;
		socket.user = user;

		socket.emit('register_user_successful');
		console.log('register_user_successful', socket.username);
		
		return user;
	}
	socket.on('register_user', function(user){
		console.log('socket.on register_user', user);

		if(socket.authenticated) return socket.register_user_fail(0);

		database.register_user(user, function(err, results){
			if(err){
				return socket.register_user_fail(2);
			}else{
				return socket.register_user_successful(user);
			}
		});
	});



	socket.login_user_fail = function login_user_fail(code){
		socket.emit('login_user_fail', code);
		console.log('login_user_fail', code);
		return code;
	}
	socket.login_user_successful = function login_user_successful(user){
		socket.authenticated = true;
		socket.user = user;

		socket.emit('login_user_successful');
		console.log('login_user_successful', socket.username);
		return user;
	}
	socket.on('login_user', function(user){
		console.log('socket.on login_user', user);

		if(socket.authenticated) return socket.login_user_fail(0);

		database.fetch_user(user.username, function(err, results){
			if(err){
				return socket.login_user_fail(2);
			}else{
				if(results[0].password == user.password){
					return socket.login_user_successful(user);
				}else{
					return socket.login_user_fail(1);
				}
			}
		});
	});



	socket.logout_user_fail = function logout_user_fail(code){
		socket.emit('logout_user_fail', code);
		console.log('logout_user_fail', code);
		return code;
	}
	socket.logout_user_successful = function logout_user_successful(){
		socket.authenticated = false;
		socket.emit('logout_user_successful');
		console.log('logout_user_successful', socket.username);
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