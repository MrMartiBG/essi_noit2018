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
						return socket.successful("add_car", {id: car_info.car_id});
					}
				});
			}
		});
	});

	socket.on('fetch_car', function(){
		console.log('socket.on fetch_car');

		if(!socket.authenticated) return socket.fail("fetch_car", {code: 101});

		database.fetch_car({owner_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fail("fetch_car", {code: 201});
			}else{
				return socket.successful("fetch_car", results);
			}
		});
	});

}

