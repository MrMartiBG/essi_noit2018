module.exports = function(socket,database,validation){

	socket.on('register_user', function(info, call_back){ // info: username password email firstname lastname mobile
		console.log('socket.on register_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail("register_user",{code: 100}, call_back);

		var user = 	{
			username: 	info.username,
			password: 	info.password,
			email:		info.email,
			firstname: 	info.firstname,
			lastname: 	info.lastname,
			mobile: 	info.mobile
		};

		database.register_user(user, function(err, results){
			if(err){
				return socket.fail("register_user", {code: 201}, call_back);
			}else{
				user.id = results.insertId;
				delete user.password;
				return socket.successful("register_user", user, call_back);
			}
		});
	});

	socket.on('login_user', function(info, call_back){ //user: username password
		console.log('socket.on login_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail("login_user",{code: 100}, call_back);

		var user = {
			username: info.username
		};

		database.fetch_user(user, function(err, results){
			if(err){
				return socket.fail("login_user",{code: 201}, call_back);
			}else{

				if(results.length == 0) return socket.fail("login_user",{code: 102}, call_back);
				if(results[0].password != info.password) return socket.fail("login_user",{code: 102}, call_back);

				delete results[0].password;
				socket.authenticated = true;
				socket.user = results[0];

				return socket.successful("login_user", socket.user, call_back);
			}
		});
	});

	socket.on('logout_user', function(info, call_back){
		console.log('socket.on logout_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated){
			return socket.fail("logout_user",{code: 100}, call_back);
		}else{
			socket.authenticated = false;
			return socket.successful("logout_user", true, call_back);
		}
	});

}
