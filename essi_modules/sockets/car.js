module.exports = function(socket,database){

	socket.add_car_fail = function add_car_fail(code){
		socket.emit('add_car_fail', code);
		console.log('add_car_fail', code);
		return code;
	}
	socket.add_car_successful = function add_car_successful(){

		socket.emit('add_car_successful');
		console.log('add_car_successful');
		
		return true;
	}
	socket.on('add_car', function(){
		console.log('socket.on add_car');

		if(!socket.authenticated) return socket.add_car_fail(0);
		var car = {};
		car.owner_id = socket.user.id;

		database.add_car(car, function(err, results){
			if(err){
				return socket.add_car_fail(2);
			}else{
				return socket.add_car_successful();
			}
		});
	});

	socket.fetch_car_fail = function fetch_car_fail(code){
		socket.emit('fetch_car_fail', code);
		console.log('fetch_car_fail', code);
		return code;
	}
	socket.fetch_car_successful = function fetch_car_successful(car){

		socket.emit('fetch_car_successful',car);
		console.log('fetch_car_successful',car);
		
		return car;
	}
	socket.on('fetch_car', function(owner_id){
		console.log('socket.on fetch_car');

		if(!socket.authenticated) return socket.fetch_car_fail(0);

		database.fetch_car(owner_id, function(err, results){
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
	socket.add_car_info_successful = function add_car_info_successful(){

		socket.emit('add_car_info_successful');
		console.log('add_car_info_successful');
		
		return true;
	}
	socket.on('add_car_info', function(car_info){
		console.log('socket.on add_car_info');

		if(!socket.authenticated) return socket.add_car_info_fail(0);

		database.add_car_info(car_info, function(err, results){
			if(err){
				return socket.add_car_info_fail(2);
			}else{
				return socket.add_car_info_successful();
			}
		});
	});

	socket.fetch_car_info_fail = function fetch_car_info_fail(code){
		socket.emit('fetch_car_info_fail', code);
		console.log('fetch_car_info_fail', code);
		return code;
	}
	socket.fetch_car_info_successful = function fetch_car_info_successful(car_info){

		socket.emit('fetch_car_info_successful',car_info);
		console.log('fetch_car_info_successful',car_info);
		
		return car_info;
	}
	socket.on('fetch_car_info', function(car_id){
		console.log('socket.on fetch_car_info');

		if(!socket.authenticated) return socket.fetch_car_info_fail(0);

		database.fetch_car_info(car_id, function(err, results){
			if(err){
				return socket.fetch_car_info_fail(2);
			}else{
				return socket.fetch_car_info_successful(results);
			}
		});
	});

}