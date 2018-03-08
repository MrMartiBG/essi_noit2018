module.exports = function(socket,database){

	socket.on('add_car', function(info, call_back){ //info: brand model generation engine vin_number
		console.log('socket.on add_car', info);
		if(info == null || call_back == null){
			socket.client_error("add_car",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("add_car", {code: 101}, call_back);
		
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
				return socket.fail("add_car", {code: 201}, call_back);
			}else{
				car_info.car_id = results.insertId;
				database.add_car_info(car_info, function(err, results){
					if(err){
						return socket.fail("add_car", {code: 202}, call_back);
					}else{
						socket.update_user(socket.user.id);
						return socket.successful("add_car", {id: car_info.car_id}, call_back);
					}
				});
			}
		});
	});

	socket.on('fetch_my_cars', function(info, call_back){ // info
		console.log('socket.on fetch_my_cars');
		if(info == null || call_back == null){
			socket.client_error("fetch_my_cars",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_my_cars", {code: 101}, call_back);

		database.fetch_car({owner_id: socket.user.id}, function(err, results){
			if(err){
				return socket.fail("fetch_my_cars", {code: 201}, call_back);
			}else{
				return socket.successful("fetch_my_cars", results, call_back);
			}
		});
	});

	function check_service_user_array_2d(a,b){
		for(var i = 0 ; i < a.length ; i++){
			for(var x = 0 ; x < b.length ; x++){
				if(a[i].service_id == b[x].service_id){
					return true;
				}
			}
		}
		return false;
	}

	socket.on('fetch_car', function(info, call_back){ // info: id
		console.log('socket.on fetch_car');
		if(info == null || call_back == null){
			socket.client_error("fetch_car",'info or call_back is null(undefined)');
			return false;
		}

		if(!socket.authenticated) return socket.fail("fetch_car", {code: 101}, call_back);

		database.fetch_service_car({car_id: info.id}, function(err, results){
			if(err){
				return socket.fail("fetch_car", {code: 201}, call_back);
			}else{
				if(check_service_user_array_2d(results,socket.service_user)){
					return database.fetch_car({id: results[0].car_id}, function(err, results){
						if(err){
							return socket.fail("fetch_car", {code: 202}, call_back);
						}else{
							return socket.successful("fetch_car", results, call_back);
						}
					});
				}
				return socket.fail("fetch_car", {code: 102}, call_back);
			}
		});
	});

}