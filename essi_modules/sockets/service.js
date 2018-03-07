module.exports = function(socket,database){

	socket.on('add_service_info', function(info){ // info: name address email mobile
		console.log('socket.on add_service_info', info);

		if(!socket.authenticated) return socket.fail("add_service_info", {code: 101});

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
				return socket.fail("add_service_info", {code: 201});
			}else{
				service_owner.service_id = results.insertId;
				console.log(service_owner);
				database.add_service_user(service_owner, function(err, results){
					if(err){
						return socket.fail("add_service_info", {code: 202});
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_service_info", {id: service_owner.service_id});
					}
				});
			}
		});
	});
	
	socket.on('fetch_service_info', function(info){ // info: id
		console.log('socket.on fetch_service_info');

		if(!socket.authenticated) return socket.fail("fetch_service_info", {code: 101});

		database.fetch_service_info({id: info.id}, function(err, results){
			if(err){
				return socket.fail("fetch_service_info", {code: 201, error: err});
			}else{
				return socket.successful("fetch_service_info", results);
			}
		});
	});



	socket.on('add_service_user', function(info){ // info: user_id user_type service_id
		console.log('socket.on add_service_user', info);

		if(!socket.authenticated) return socket.fail("add_service_user", {code: 101});

		var service_user = 	{	
								user_id: info.user_id, 
								user_type: info.user_type,
								service_id: info.service_id
							};

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id && socket.service_user[i].user_type == 'owner'){
				return database.add_service_user(service_user, function(err, results){
					if(err){
						return socket.fail("add_service_user", {code: 201});
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_service_user", service_user);
					}
				});
			}
		}
		return socket.fail("add_service_user", {code: 102});
	});

	socket.on('fetch_my_service_user', function(){
		console.log('socket.on fetch_my_service_userfetch_my_service_user');

		if(!socket.authenticated) return socket.fail("fetch_my_service_user", {code: 101});

		database.fetch_service_user({user_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fail("fetch_my_service_user", {code: 201});
			}else{
				return socket.successful("fetch_my_service_user", results);
			}
		});

	});

	socket.on('fetch_service_user', function(info){ // info: service_id
		console.log('socket.on fetch_service_user');

		if(!socket.authenticated) return socket.fail("fetch_service_user", {code: 101});

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id && socket.service_user[i].user_type == "owner"){

				return database.fetch_service_user({service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_user", {code: 201});
					}else{
						return socket.successful("fetch_service_user", results);
					}
				});
			}
		}
		return socket.fail("fetch_service_user", {code: 102});
	});

	socket.on('add_service_car', function(info){ // info: car_id service_id
		console.log('socket.on add_service_car', info);

		if(!socket.authenticated) return socket.fail("add_service_car", {code: 101});

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
						return socket.fail("add_service_car", {code: 201});
					}else{
						return socket.successful("add_service_car", service_car);
					}
				});
			}
		}
		return socket.fail("add_service_car", {code: 102});
	});
	
	socket.on('fetch_service_car', function(info){ // info: car_id service_id
		console.log('socket.on fetch_service_car');

		if(!socket.authenticated) return socket.fail("fetch_service_car", {code: 101});

		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id){
				return database.fetch_service_car({car_id: info.car_id, service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_car", {code: 201});
					}else{
						return socket.successful("fetch_service_car", results);
					}
				});
			}
		}
		for(var i = 0; i < socket.car.length ;i++){
			if(socket.car[i].id == info.car_id){
				return database.fetch_service_car({car_id: info.car_id, service_id: info.service_id}, function(err, results){
					if(err){
						return socket.fail("fetch_service_car", {code: 201});
					}else{
						return socket.successful("fetch_service_car", results);
					}
				});
			}
		}
		return socket.fail("fetch_service_car", {code: 102});
	});

}

