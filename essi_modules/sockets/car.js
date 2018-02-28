module.exports = function(socket,database){

	socket.add_car_fail = function add_car_fail(code){
		socket.emit('add_car_fail', code);
		console.log('add_car_fail', code);
		return code;
	}
	socket.add_car_successful = function add_car_successful(results){

		socket.emit('add_car_successful',results);
		console.log('add_car_successful',results);
		
		return results;
	}
	socket.on('add_car', function(info){
		console.log('socket.on add_car', info);

		if(!socket.authenticated) return socket.add_car_fail(0);
		
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
				return socket.add_car_fail(2);
			}else{
				car_info.car_id = results.insertId;
				database.add_car_info(car_info, function(err, results){
					if(err){
						return socket.add_car_fail(2);
					}else{
						return socket.add_car_successful(car_info.car_id);
					}
				});
			}
		});
	});

	socket.fetch_car_fail = function fetch_car_fail(code){
		socket.emit('fetch_car_fail', code);
		console.log('fetch_car_fail', code);
		return code;
	}
	socket.fetch_car_successful = function fetch_car_successful(results){

		socket.emit('fetch_car_successful',results);
		console.log('fetch_car_successful',results);
		
		return results;
	}
	socket.on('fetch_car', function(){
		console.log('socket.on fetch_car');

		if(!socket.authenticated) return socket.fetch_car_fail(0);

		database.fetch_car({owner_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fetch_car_fail(2);
			}else{
				return socket.fetch_car_successful(results);
			}
		});
	});

}