module.exports = function(socket,database){

	socket.on('add_service_info', function(info, call_back){ // info: name address email mobile
		console.log('socket.on add_service_info', info);
		if(info == null || call_back == null){
			socket.server_error("add_service_info",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("add_service_info", {code: 101}, call_back);

		var service_owner = 	{	
									user_id: socket.user.id, 
									user_type: "owner"	
								};
		var service_info = {
								name: info.name,
								address: info.address,
								email: info.email,
								mobile: info.mobile
					   		};
		database.add_service_info(service_info, function(err, results){
			if(err){
				return socket.fail("add_service_info", {code: 201}, call_back);
			}else{
				service_owner.service_id = results.insertId;
				console.log(service_owner);
				database.add_service_user(service_owner, function(err, results){
					if(err){
						return socket.fail("add_service_info", {code: 202}, call_back);
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_service_info", {id: service_owner.service_id}, call_back);
					}
				});
			}
		});
	});
	
	socket.on('fetch_service_info', function(info, call_back){ // info: id
		console.log('socket.on fetch_service_info');
		if(info == null || call_back == null){
			socket.server_error("fetch_service_info",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_service_info", {code: 101}, call_back);

		database.fetch_service_info({id: info.id}, function(err, results){
			if(err){
				return socket.fail("fetch_service_info", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_service_info", results, call_back);
			}
		});
	});



	socket.on('add_service_user', function(info, call_back){ // (info: user_id and or user_type) and service_id
															 // or user_id only
		console.log('socket.on add_service_user', info);
		if(info == null || call_back == null){
			socket.server_error("add_service_user",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("add_service_user", {code: 101}, call_back);

		var service_user = 	{	
								user_id: info.user_id, 
								user_type: info.user_type,
								service_id: info.service_id
							};

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id && socket.service_user[i].user_type == 'owner'){
				return database.add_service_user(service_user, function(err, results){
					if(err){
						return socket.fail("add_service_user", {code: 201}, call_back);
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_service_user", service_user, call_back);
					}
				});
			}
		}
		return socket.fail("add_service_user", {code: 102}, call_back);
	});

	socket.on('fetch_my_service_user', function(info, call_back){
		console.log('socket.on fetch_my_service_userfetch_my_service_user');
		if(info == null || call_back == null){
			socket.server_error("fetch_my_service_user",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_my_service_user", {code: 101}, call_back);

		database.fetch_service_user({user_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fail("fetch_my_service_user", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_my_service_user", results, call_back);
			}
		});

	});

	socket.on('fetch_service_user', function(info, call_back){ // info: service_id
		console.log('socket.on fetch_service_user');
		if(info == null || call_back == null){
			socket.server_error("fetch_service_user",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_service_user", {code: 101}, call_back);

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id && socket.service_user[i].user_type == "owner"){

				return database.fetch_service_user({service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_user", {code: 201}, call_back);
					}else{
						return socket.successful("fetch_service_user", results, call_back);
					}
				});
			}
		}
		return socket.fail("fetch_service_user", {code: 102}, call_back);
	});

	socket.on('add_service_car', function(info, call_back){ // info: car_id service_id
		console.log('socket.on add_service_car', info);
		if(info == null || call_back == null){
			socket.server_error("add_service_car",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("add_service_car", {code: 101}, call_back);

		var service_car = 	{	
								car_id: info.car_id,
								service_id: info.service_id
							};
		var service_owner = {	
								user_id: socket.user.id,
								service_id: info.service_id
							};

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id){
				return database.add_service_car(service_car, function(err, results){
					if(err){
						return socket.fail("add_service_car", {code: 201}, call_back);
					}else{
						return socket.successful("add_service_car", service_car, call_back);
					}
				});
			}
		}
		return socket.fail("add_service_car", {code: 102}, call_back);
	});
	
	socket.on('fetch_service_car', function(info, call_back){ // info: car_id and or service_id
		console.log('socket.on fetch_service_car');
		if(info == null || call_back == null){
			socket.server_error("fetch_service_car",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_service_car", {code: 101}, call_back);

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id){
				return database.fetch_service_car({car_id: info.car_id, service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_car", {code: 201}, call_back);
					}else{
						return socket.successful("fetch_service_car", results, call_back);
					}
				});
			}
		}
		for(var i = 0; i < socket.car.length ;i++){
			if(socket.car[i].id == info.car_id){
				return database.fetch_service_car({car_id: info.car_id, service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_car", {code: 201}, call_back);
					}else{
						return socket.successful("fetch_service_car", results, call_back);
					}
				});
			}
		}
		return socket.fail("fetch_service_car", {code: 102}, call_back);
	});

}

