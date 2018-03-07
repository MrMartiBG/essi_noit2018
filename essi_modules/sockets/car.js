module.exports = function(socket,database){

	socket.on('add_car', function(info){
		console.log('socket.on add_car', info);

		if(!socket.authenticated) return socket.fail("add_car", {code: 101});
		
		var car = 		{	owner_id: socket.user.id 	};
		var car_info = 	{
							brand: info.brand,
							model: info.model,
							generation: info.generation,
							engine: info.engine,
							vin_number: info.vin_number
					   	};
		database.add_car(car, function(err, results){
			if(err){
				return socket.fail("add_car", {code: 201});
			}else{
				car_info.car_id = results.insertId;
				database.add_car_info(car_info, function(err, results){
					if(err){
						return socket.fail("add_car", {code: 202});
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_car", {id: car_info.car_id});
					}
				});
			}
		});
	});

	socket.on('fetch_my_cars', function(){
		console.log('socket.on fetch_my_cars');

		if(!socket.authenticated) return socket.fail("fetch_my_cars", {code: 101});

		database.fetch_car({owner_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fail("fetch_my_cars", {code: 201});
			}else{
				return socket.successful("fetch_my_cars", results);
			}
		});
	});

	socket.on('fetch_car', function(info){
		console.log('socket.on fetch_car');

		if(!socket.authenticated) return socket.fail("fetch_car", {code: 101});

		database.fetch_service_car({car_id: info.car_id}, function(err, results){
			if(err){
				return socket.fail("fetch_car", {code: 201});
			}else{
				for(var i = 0 ; i < results.length ; i++){
					if(results[i].service_id == socket.service_user.service_id){
						return database.fetch_car({id: results[i].car_id}, function(err, results){
							if(err){
								return socket.fail("fetch_car", {code: 202});
							}else{
								return socket.successful("fetch_car", results);
							}
						});
					}
				}
			}
		});
	});

}