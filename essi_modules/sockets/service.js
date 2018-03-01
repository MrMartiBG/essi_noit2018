module.exports = function(socket,database){
	
	socket.add_service_info_fail = function add_service_info_fail(code){
		socket.emit('add_service_info_fail', code);
		console.log('add_service_info_fail', code);
		return code;
	}
	socket.add_service_info_successful = function add_service_info_successful(results){

		socket.emit('add_service_info_successful',results);
		console.log('add_service_info_successful',results);
		
		return results;
	}
	socket.on('add_service_info', function(info){
		console.log('socket.on add_service_info', info);

		if(!socket.authenticated) return socket.add_service_info_fail(0);

		var service_owner = 	{	
									user_id: socket.user.id, 
									user_type: "owner"	
								};
		var service_info = {
									name: info.name,
									address: info.address,
									email: info.email,
									mobile: info.mobile
					   			};
		database.add_service_info(service_info, function(err, results){
			if(err){
				return socket.add_service_info_fail(2);
			}else{
				service_owner.service_id = results.insertId;
				console.log(service_owner);
				database.add_service_user(service_owner, function(err, results){
					if(err){
						return socket.add_service_info_fail(2);
					}else{
						return socket.add_service_info_successful({id: service_owner.service_id});
					}
				});
			}
		});
	});

	socket.fetch_service_info_fail = function fetch_service_info_fail(code){
		socket.emit('fetch_service_info_fail', code);
		console.log('fetch_service_info_fail', code);
		return code;
	}
	socket.fetch_service_info_successful = function fetch_service_info_successful(results){

		socket.emit('fetch_service_info_successful',results);
		console.log('fetch_service_info_successful',results);
		
		return results;
	}
	socket.on('fetch_service_info', function(service_id){
		console.log('socket.on fetch_service_info');

		if(!socket.authenticated) return socket.fetch_service_info_fail(0);

		database.fetch_service_info({service_id: service_id}, function(err, results){
			if(err){
				return socket.fetch_service_info_fail(2);
			}else{
				return socket.fetch_service_info_successful(results);
			}
		});
	});

}

// service_info
// id
// name
// address
// email
// mobile

// service_user
// service_id
// user_id
// user_type

// service_service_info
// service_id
// service_info_id
