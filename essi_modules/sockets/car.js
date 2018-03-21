module.exports = function(socket,database,validation){

	socket.on('add_car', function(info, call_back){ //info: brand model generation engine vin_number
		console.log('socket.on add_car', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_car", {code: 101}, call_back);

		var car = {
			owner_id: 	socket.user.id,
			brand: 		info.brand,
			model: 		info.model,
			generation: info.generation,
			engine: 	info.engine,
			vin_number: info.vin_number
		};
		if(info.public){
			car.public = true;
		}

		database.add_car(car, function(err, results){
			if(err){
				return socket.fail("add_car", {code: 201}, call_back);
			}else{
				car.id = results.insertId;
				return socket.successful("add_car", car, call_back);
			}
		});
	});

	socket.on('fetch_car_current_user', function(info, call_back){ // info
		console.log('socket.on fetch_car_current_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_car_current_user", {code: 101}, call_back);

		car = {
			owner_id: socket.user.id
		};

		database.fetch_car(car, function(err, results){
			if(err){
				return socket.fail("fetch_car_current_user", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_car_current_user", results, call_back);
			}
		});
	});


	// socket.on('fetch_car_service', function(info, call_back){ // info
	// 	console.log('socket.on fetch_car_service', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;
	// 	if(!socket.authenticated) return socket.fail("fetch_car_service", {code: 101}, call_back);
	//
	// 	car = {
	// 		id: info.id
	// 	};
	// 	service_car = {
	// 		car_id: info.id
	// 	};
	// 	service_user = {
	// 		user_id: socket.user.id
	// 	};
	//
	// 	database.fetch_service_user(service_user, function(err, results){
	// 		if(err)
	// 			return socket.fail("fetch_car_service", {code: 201}, call_back);
	// 		service_user = results;
	// 		database.fetch_service_car(service_car, function(err, results){
	// 			if(err)
	// 				return socket.fail("fetch_car_service", {code: 202}, call_back);
	// 			service_car = results;
	// 			if(!validation.service_car_service_user_in(service_car, service_user))
	// 				return socket.fail("fetch_car_service", {code: 103}, call_back);
	// 			database.fetch_car(car, function(err, results){
	// 				if(err) return socket.fail("fetch_car_service", {code: 203}, call_back);
	// 				return socket.successful("fetch_car_service", results, call_back);
	// 			});
	// 		});
	// 	});
	// });

	socket.on('fetch_car_public', function(info, call_back){ // info: id
		console.log('socket.on fetch_car_public', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		car = {
			id: info.id
		};

		database.fetch_car(car, function(err, results){
			if(err){
				return socket.fail("fetch_car_public", {code: 201}, call_back);
			}else{
				if(!validation.car_public(results[0])) return socket.fail("fetch_car_public", {code: 103}, call_back);
				return socket.successful("fetch_car_public", results[0], call_back);
			}
		});
	});

}
