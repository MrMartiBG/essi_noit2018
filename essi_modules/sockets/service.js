module.exports = function(socket,database){

	socket.on('add_service_info', function(info){
		console.log('socket.on add_service_info', info);

		if(!socket.authenticated) return socket.fail("add_service_info", {code: 101});

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
				return socket.fail("add_service_info", {code: 201});
			}else{
				service_owner.service_id = results.insertId;
				console.log(service_owner);
				database.add_service_user(service_owner, function(err, results){
					if(err){
						return socket.fail("add_service_info", {code: 202});
					}else{
						return socket.successful("add_service_info", {id: service_owner.service_id});
					}
				});
			}
		});
	});
	
	socket.on('fetch_service_info', function(service_id){
		console.log('socket.on fetch_service_info');

		if(!socket.authenticated) return socket.fail("fetch_service_info", {code: 101});

		database.fetch_service_info({service_id: service_id}, function(err, results){
			if(err){
				return socket.fail("fetch_service_info", {code: 201});
			}else{
				return socket.successful("fetch_service_info", results);
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
