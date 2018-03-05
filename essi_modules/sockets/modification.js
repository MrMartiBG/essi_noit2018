module.exports = function(socket,database){

	socket.on('add_modification', function(info){
		console.log('socket.on add_modification', info);

		if(!socket.authenticated) return socket.fail("add_modification", {code: 101});

		var modification = 	{		car_id: info.car_id,
									service_id: info.service_id,
									status: info.status,
									mileage: info.mileage,
									date: info.date	
							};
		var modification_info = {	type: info.type,
									part: info.part,
									description: info.description
								};
		database.add_modification(modification, function(err, results){
			if(err){
				return socket.fail("add_modification", {code: 201, error: err});
			}else{
				modification_info.modification_id = results.insertId;
				database.add_modification_info(modification_info, function(err, results){
					if(err){
						return socket.fail("add_modification", {code: 202, error: err});
					}else{
						return socket.successful("add_modification", {id: modification_info.modification_id});
					}
				});
			}
		});
	});

	socket.on('fetch_modification', function(info){
		console.log('socket.on fetch_modification');

		if(!socket.authenticated) return socket.fail("fetch_modification", {code: 101});

		database.fetch_modification({car_id: info.car_id}, function(err, results){
			if(err){
				return socket.fail("fetch_modification", {code: 201});
			}else{
				return socket.successful("fetch_modification", results);
			}
		});
	});

}
