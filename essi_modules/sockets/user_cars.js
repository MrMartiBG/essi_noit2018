module.exports = function(socket,database){


	socket.on('add_car_this_user', function(info, call_back){

		console.log('socket.on add_car_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_car_this_user", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail("add_car_this_user", {errmsg: "You are not user"}, call_back);

		var  car = {};
			if(info.make != undefined) car.make = info.make;
			if(info.model != undefined) car.model = info.model;
			if(info.generation != undefined) car.generation = info.generation;
			if(info.engine != undefined) car.engine = info.engine;
			if(info.vin_number != undefined) car.vin_number = info.vin_number;
			if(info.registration_number != undefined) car.registration_number = info.registration_number;
			if(info.public != undefined) car.public = info.public;
			if(info.info != undefined) car.info = info.info;
		

		database.add_car(car, function(err, results){
			if(err) return socket.fail("add_car_this_user", {errmsg: "database error add_car", code: err.code}, call_back);

			car.id = results.insertId;

			database.add_user_car({car_id: car.id, account_user_id: socket.account.id}, function(err, results){
				if(err){
					database.delete_car({id: car.id}, function(){});
					return socket.fail("add_car_this_user", {errmsg: "database error add_user_car", code: err.code}, call_back);
				}
				return socket.successful("add_car_this_user", car, call_back);
			});
		});

	});


	// socket.on('get_cars_this_user', function(info, call_back){

	// 	console.log('socket.on get_cars_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail("get_cars_this_user", {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail("get_cars_this_user", {errmsg: "You are not user"}, call_back);

	// 	var  object = {
	// 		arg:	info.arg
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail("get_cars_this_user", {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful("get_cars_this_user", return_value, call_back);
	// 	});

	// });


	// socket.on('set_car_data_this_user', function(info, call_back){

	// 	console.log('socket.on set_car_data_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail("set_car_data_this_user", {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail("set_car_data_this_user", {errmsg: "You are not user"}, call_back);

	// 	var  object = {
	// 		arg:	info.arg
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail("set_car_data_this_user", {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful("set_car_data_this_user", return_value, call_back);
	// 	});

	// });


	// socket.on('delete_car_this_user', function(info, call_back){

	// 	console.log('socket.on delete_car_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail("delete_car_this_user", {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail("delete_car_this_user", {errmsg: "You are not user"}, call_back);

	// 	var  object = {
	// 		arg:	info.arg
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail("delete_car_this_user", {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful("delete_car_this_user", return_value, call_back);
	// 	});

	// });


	// socket.on('add_car_to_service_this_user', function(info, call_back){

	// 	console.log('socket.on add_car_to_service_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail("add_car_to_service_this_user", {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail("add_car_to_service_this_user", {errmsg: "You are not user"}, call_back);

	// 	var  object = {
	// 		arg:	info.arg
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail("add_car_to_service_this_user", {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful("add_car_to_service_this_user", return_value, call_back);
	// 	});

	// });


	// socket.on('get_public_car', function(info, call_back){

	// 	console.log('socket.on get_public_car', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(socket.account.type != "user") return socket.fail("get_public_car", {errmsg: "You are not user"}, call_back);

	// 	var  object = {
	// 		arg:	info.arg
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail("get_public_car", {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful("get_public_car", return_value, call_back);
	// 	});

	// });

}
