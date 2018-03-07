module.exports = function(socket,database){

	socket.on('add_modification', function(info){
		console.log('socket.on add_modification', info);

		if(!socket.authenticated) return socket.fail("add_modification", {code: 101});

		var today = new Date();
		var modification = 	{		car_id: info.car_id,
									service_id: info.service_id,
									status: info.status,
									mileage: info.mileage,
									date: today	
							};
		var modification_info = {	type: info.type,
									part: info.part,
									description: info.description
								};


		for(var i = 0; i < socket.service_user.length ;i++){
			if(socket.service_user[i].service_id == info.service_id){
				return database.add_modification(modification, function(err, results){
					if(err){
						return socket.fail("add_modification", {code: 201, error: err});
					}else{
						modification_info.modification_id = results.insertId;
						database.add_modification_info(modification_info, function(err, results){
							if(err){
								return socket.fail("add_modification", {code: 202, error: err});
							}else{
								return socket.successful("add_modificadtion", {id: modification_info.modification_id});
							}
						});
					}
				});
			}
		}
		return socket.fail("add_modification", {code: 102});
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

	socket.on('fetch_modification', function(info){
		console.log('socket.on fetch_modification');

		if(!socket.authenticated) return socket.fail("fetch_modification", {code: 101});


		for(var i = 0 ; i < socket.car.length; i++){
			if(socket.car[i].id == info.car_id){
				return database.fetch_modification({car_id: info.car_id}, function(err, results){
					if(err){
						return socket.fail("fetch_modification", {code: 201});
					}else{
						return socket.successful("fetch_modification", results);
					}
				});
			}
		}


		database.fetch_service_car({car_id: info.car_id}, function(err, results){
			if(err){
				return socket.fail("fetch_modification", {code: 201});
			}else{
				if(check_service_user_array_2d(results,socket.service_user)){
					return database.fetch_modification({car_id: info.car_id}, function(err, results){
						if(err){
							return socket.fail("fetch_modification", {code: 202});
						}else{
							return socket.successful("fetch_modification", results);
						}
					});
				}
				return socket.fail("fetch_modification", {code: 102});
			}
		});
	});

}

