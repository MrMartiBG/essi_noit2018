module.exports = function(socket,database,validation){

	socket.on('add_service', function(info, call_back){ // info: name address email mobile
		console.log('socket.on add_service', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_service", {code: 101}, call_back);

		var service_owner = 	{
			user_id: socket.user.id,
			user_type: "owner"
		};
		var service = {
			name: info.name,
			address: info.address,
			email: info.email,
			mobile: info.mobile
   		};
		database.add_service(service, function(err, results){
			if(err) return socket.fail("add_service", {code: 201}, call_back);
			service_owner.service_id = results.insertId;
			service.id = results.insertId;
			database.add_service_user(service_owner, function(err, results){
				if(err){
					return socket.fail("add_service", {code: 202}, call_back);
				}else{
					return socket.successful("add_service", service, call_back);
				}
			});
		});
	});

	socket.on('fetch_service', function(info, call_back){ // info: id
		console.log('socket.on fetch_service');
		if(!socket.arguments_valid(info, call_back)) return false;

		var service = {
			id: info.id
		};

		database.fetch_service(service, function(err, results){
			if(err) return socket.fail("fetch_service", {code: 201}, call_back);
			return socket.successful("fetch_service", results[0], call_back);
		});
	});



	socket.on('add_service_user', function(info, call_back){ //info user_id user_type service_id
		console.log('socket.on add_service_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_service_user", {code: 101}, call_back);

		var new_service_user = 	{
			user_id: info.user_id,
			user_type: info.user_type,
			service_id: info.service_id
		};
		var service_user = 	{
			service_id: info.service_id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err) return socket.fail("add_service_user", {code: 201}, call_back);
			if(!validation.user_service_user_owner(socket.user, results))
				return socket.fail("add_service_user", {code: 103}, call_back);
			database.add_service_user(new_service_user, function(err, results){
				if(err)
					return socket.fail("add_service_user", {code: 202}, call_back);
				return socket.successful("add_service_user", new_service_user, call_back);
			});
		});
	});

	socket.on('fetch_service_user_current_user', function(info, call_back){
		console.log('socket.on fetch_service_user_current_user');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_service_user_current_user", {code: 101}, call_back);

		var service_user = {
			user_id: socket.user.id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err){
				return socket.fail("fetch_service_user_current_user", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_service_user_current_user", results, call_back);
			}
		});

	});

	socket.on('fetch_service_user_service', function(info, call_back){
		console.log('socket.on fetch_service_user_current_user');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_service_user_current_user", {code: 101}, call_back);

		var service_user = {
			service_id: info.service_id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err) return socket.fail("fetch_service_user_service", {code: 201}, call_back);
			if(!validation.user_service_user_in(socket.user, results))
				return socket.fail("fetch_service_user_service", {code: 103}, call_back);
			return socket.successful("fetch_service_user_service", results, call_back);
		});
	});

	socket.on('add_service_car', function(info, call_back){ // info: car_id service_id
		console.log('socket.on add_service_car', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_service_car", {code: 101}, call_back);

		var service_car = 	{
			car_id: info.car_id,
			service_id: info.service_id
		};
		var service_user = {
			service_id: info.service_id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err) return socket.fail("add_service_car", {code: 201}, call_back);
			if(!validation.user_service_user_in(socket.user, results))
				return socket.fail("add_service_car", {code: 103}, call_back);
			database.add_service_car(service_car, function(err, results){
				if(err) return socket.fail("add_service_car", {code: 202}, call_back);
				return socket.successful("add_service_car", service_car, call_back);
			});
		});
	});


	socket.on('fetch_service_car_service', function(info, call_back){
		console.log('socket.on fetch_service_car_service');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_service_car_service", {code: 101}, call_back);

		var service_car = {
			service_id: info.service_id
		};
		var service_user = {
			service_id: info.service_id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err) return socket.fail("fetch_service_car_service", {code: 201}, call_back);
			if(!validation.user_service_user_in(socket.user, results))
				return socket.fail("add_service_car", {code: 103}, call_back);
			database.fetch_service_car(service_car, function (err, results){
				if(err) return socket.fail("fetch_service_car_service", {code: 202}, call_back);
				return socket.successful("fetch_service_car_service", results, call_back);
			});
		});
	});


	socket.on('fetch_service_car_current_user', function(info, call_back){
		console.log('socket.on fetch_service_car_current_user');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_service_car_current_user", {code: 101}, call_back);

		var service_car = {
			car_id: info.car_id
		};
		var car = {
			id: info.car_id
		};

		database.fetch_car(car, function(err, results){
			if(err) return socket.fail("fetch_service_car_current_user", {code: 201}, call_back);
			if(!validation.user_car_owner(socket.user, results[0]))
				return socket.fail("fetch_service_car_current_user", {code: 103}, call_back);
			database.fetch_service_car(service_car, function (err, results){
				if(err) return socket.fail("fetch_service_car_current_user", {code: 202}, call_back);
				return socket.successful("fetch_service_car_current_user", results, call_back);
			});
		});
	});

}
