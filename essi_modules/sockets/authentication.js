module.exports = function(socket,database){

	socket.update_user = function update_user(id){
		database.fetch_user({id: id}, function(err, results){
			if(err){
				return true;
			}else{

				if(results.length == 0) return socket.fail("authentication",{code: 0});

				results[0].password = undefined; 
				socket.user = results[0];

				console.log(socket.user);

				return true;
			}
		});

		database.fetch_car_only({owner_id: id}, function(err, results){
			if(err){
				return true;
			}else{

				socket.car = results;

				console.log(socket.car);

				return true;
			}
		});

		database.fetch_service_user({user_id: id}, function(err, results){
			if(err){
				return true;
			}else{

				socket.service_user = results;

				console.log(socket.service_user);

				return true;
			}
		});
	}

	
	socket.on('register_user', function(info, call_back){ // info: username password email firstname lastname mobile
		console.log('socket.on register_user', info);

		if(socket.authenticated) return socket.fail("register_user",{code: 100}, call_back);

		var user = {username: info.username, password: info.password, email: info.email};
		var user_info = {firstname: info.firstname, lastname: info.lastname, mobile: info.mobile};

		database.register_user(user, function(err, results){
			if(err){
				return socket.fail("register_user",{code: 201}, call_back);
			}else{
				user_info.user_id = results.insertId;
				database.add_user_info(user_info, function(err, results){
					console.log(err);
					if(err){
						return socket.fail("register_user",{code: 202}, call_back);
					}else{
						user.password = undefined; 
						return socket.successful("register_user", user, call_back);
					}
				});
			}
		});
	});

	socket.on('login_user', function(user, call_back){ //user: username password	
		console.log('socket.on login_user', user);

		if(socket.authenticated) return socket.fail("login_user",{code: 100, call_back});

		database.fetch_user({username: user.username}, function(err, results){
			if(err){
				return socket.fail("login_user",{code: 201}, call_back);
			}else{

				if(results.length == 0) return socket.fail("login_user",{code: 103}, call_back);
				if(results[0].password != user.password) return socket.fail("login_user",{code: 102}, call_back);

				socket.authenticated = true;
				socket.update_user(results[0].id);

				results[0].password = undefined;

				return socket.successful("login_user", results[0], call_back);
			}
		});
	});

	socket.on('logout_user', function(info, call_back){
		console.log('socket.on logout_user', socket.user);
		if(!socket.authenticated){
			return socket.fail("logout_user",{code: 100}, call_back);
		}else{
			return socket.successful("logout_user", true, call_back);
		}
	});

}