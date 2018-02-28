module.exports = function(socket,database){

	socket.add_car_fail = function add_car_fail(code){
		socket.emit('add_car_fail', code);
		console.log('add_car_fail', code);
		return code;
	}
	socket.add_car_successful = function add_car_successful(results){

		socket.emit('add_car_successful',{id: results.insertId});
		console.log('add_car_successful',{id: results.insertId});
		
		return {id: results.insertId};
	}
	socket.on('add_car', function(){
		console.log('socket.on add_car');

		if(!socket.authenticated) return socket.add_car_fail(0);

		database.add_car({owner_id: socket.user.id}, function(err, results){
			if(err){
				return socket.add_car_fail(2);
			}else{
				return socket.add_car_successful(results);
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




	socket.add_car_info_fail = function add_car_info_fail(code){
		socket.emit('add_car_info_fail', code);
		console.log('add_car_info_fail', code);
		return code;
	}
	socket.add_car_info_successful = function add_car_info_successful(results){

		socket.emit('add_car_info_successful',results);
		console.log('add_car_info_successful',results);
		
		return results;
	}
	socket.on('add_car_info', function(car_info){
		console.log('socket.on add_car_info');

		if(!socket.authenticated) return socket.add_car_info_fail(0);

		database.add_car_info({
			car_id: car_info.car_id,
			brand: car_info.brand,
			model: car_info.model,
			generation: car_info.generation,
			engine: car_info.engine,
			vin_number: car_info.vin_number
		}, function(err, results){
			if(err){
				return socket.add_car_info_fail(2);
			}else{
				return socket.add_car_info_successful(results);
			}
		});
	});

	socket.fetch_car_info_fail = function fetch_car_info_fail(code){
		socket.emit('fetch_car_info_fail', code);
		console.log('fetch_car_info_fail', code);
		return code;
	}
	socket.fetch_car_info_successful = function fetch_car_info_successful(results){

		socket.emit('fetch_car_info_successful',{id: results.insertId});
		console.log('fetch_car_info_successful',{id: results.insertId});
		
		return {id: results.insertId};
	}
	socket.on('fetch_car_info', function(car_id){
		console.log('socket.on fetch_car_info');

		if(!socket.authenticated) return socket.fetch_car_info_fail(0);

		database.fetch_car_info({car_id: car_id}, function(err, results){
			if(err){
				return socket.fetch_car_info_fail(2);
			}else{
				return socket.fetch_car_info_successful(results);
			}
		});
	});

}