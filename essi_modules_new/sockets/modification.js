module.exports = function(socket,database){

	socket.on('add_modification_current', function(info, call_back){
		console.log('socket.on add_modification_current', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_modification_current", {code: 101}, call_back);

		var modification = 	{
			car_id: info.car_id,
			status: info.status,
			mileage: info.mileage,
			date: info.date,
			type: info.type,
			part: info.part,
			description: info.description
		};
		var car = {
			id: info.car_id
		}
		console.log(car, modification);
		database.fetch_car(car, function(err, results){
			if(err) return socket.fail("add_modification_current", {code: 201}, call_back);
			if(results.length == 0) return socket.fail("add_modification_current", {code: 203}, call_back);
			if(results[0].owner_id != socket.user.id) return socket.fail("add_modification_current", {code: 103}, call_back);
			database.add_modification(modification, function(err, results){
				if(err) return socket.fail("add_modification_current", {code: 202}, call_back);
				modification.id = results.insertId;
				return socket.successful("add_modification_current", modification, call_back);
			});
		});
	});


	socket.on('add_modification_service', function(info, call_back){
		console.log('socket.on add_modification_service', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_modification_service", {code: 101}, call_back);

		var today = new Date();
		var modification = 	{
			car_id: info.car_id,
			service_id: info.service_id,
			status: info.status,
			mileage: info.mileage,
			date: today,
			type: info.type,
			part: info.part,
			description: info.description
		};

		var service_user = {
			user_id: socket.user.id
		};

		database.fetch_service_user(service_user, function(err, results){
			if(err) return socket.fail("add_modification_service", {code: 201}, call_back);
			for(var i = 0; i < results.length ;i++){
				if(results[i].service_id == modification.service_id){
					return database.add_modification(modification, function(err, results){
						if(err) return socket.fail("add_modification_service", {code: 201}, call_back);
						modification.id = results.insertId;
						return socket.successful("add_modification_service", modification, call_back);
					});
				}
			}
			return socket.fail("add_modification_service", {code: 103}, call_back);
		});

	});

	socket.on('fetch_modification_service', function(info, call_back){ // info: car_id
		console.log('socket.on fetch_modification_service');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_modification_service", {code: 101}, call_back);

		var modification = {
			car_id: info.car_id
		}

		// TODO: VALIDATION
		return database.fetch_modification(modification, function(err, results){
			if(err){
				return socket.fail("fetch_modification_service", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_modification_service", results, call_back);
			}
		});

	});

	socket.on('fetch_modification_current', function(info, call_back){ // info: car_id
		console.log('socket.on fetch_modification_current');
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("fetch_modification_current", {code: 101}, call_back);

		var modification = {
			car_id: info.car_id
		}
		var car = {
			id: info.car_id
		}

		database.fetch_car(car, function(err, results){
			if(err) return socket.fail("fetch_modification_current", {code: 201, error: err}, call_back);
			if(results[0].owner_id != socket.user.id) return socket.fail("fetch_modification_current", {code: 103}, call_back);
			database.fetch_modification(modification, function(err, results){
				if(err) return socket.fail("fetch_modification_current", {code: 201}, call_back);
				return socket.successful("fetch_modification_current", results, call_back);
			});
		});

	});


}
