module.exports = function(socket,database){

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
				return socket.successful("add_car", {car: car}, call_back);
			}
		});
	});

	socket.on('fetch_car_current', function(info, call_back){ // info
		console.log('socket.on fetch_car_current', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_car_current", {code: 101}, call_back);

		car = {
			owner_id: socket.user.id
		};

		database.fetch_car(car, function(err, results){
			if(err){
				return socket.fail("fetch_car_current", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_car_current", results, call_back);
			}
		});
	});

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
				if(results[0].public){
					return socket.successful("fetch_car_public", results, call_back);
				}else{
					return socket.fail("fetch_car_public", {code: 103}, call_back);
				}
			}
		});
	});

}