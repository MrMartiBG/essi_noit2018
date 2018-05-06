module.exports = function(socket,database){


	socket.on('add_car_this_user', function(info, call_back){

		var func_name = "add_car_this_user";

		console.log('socket.on add_car_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

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
			if(err) return socket.fail(func_name, {errmsg: "database error add_car", code: err.code}, call_back);

			car.id = results.insertId;

			database.add_user_car({car_id: car.id, account_user_id: socket.account.id}, function(err, results){
				if(err){
					database.delete_car({id: car.id}, function(){});
					return socket.fail(func_name, {errmsg: "database error add_user_car", code: err.code}, call_back);
				}
				return socket.successful(func_name, car, call_back);
			});
		});

	});


	socket.on('get_cars_this_user', function(info, call_back){

		var func_name = "get_cars_this_user";

		console.log('socket.on get_cars_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

		var user = {
			account_user_id: socket.account.id
		};

		database.get_user_cars(user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_user_cars", code: err.code}, call_back);
			return socket.successful(func_name, results, call_back);
		});

	});


	socket.on('set_car_data_this_user', function(info, call_back){

		var func_name = "set_car_data_this_user";

		console.log('socket.on set_car_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);
		if(info.id == undefined) return socket.fail(func_name, {errmsg: "car.id is undefined"}, call_back);
		
		var car = {car_id: info.id};

		var  new_car = {};

			if(info.make != undefined) new_car.make = info.make;
			if(info.model != undefined) new_car.model = info.model;
			if(info.generation != undefined) new_car.generation = info.generation;
			if(info.engine != undefined) new_car.engine = info.engine;
			if(info.vin_number != undefined) new_car.vin_number = info.vin_number;
			if(info.registration_number != undefined) new_car.registration_number = info.registration_number;
			if(info.public != undefined) new_car.public = info.public;
			if(info.info != undefined) new_car.info = info.info;
		

		database.set_car(new_car, car, {account_user_id: socket.account.id}, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error set_car", code: err}, call_back);
			if(results.affectedRows == 0) 
				return socket.fail(func_name, {errmsg: "affectedRows = 0"}, call_back);
			return socket.successful(func_name, new_car, call_back);
		});

	});


	socket.on('delete_car_this_user', function(info, call_back){

		var func_name = "delete_car_this_user";

		console.log('socket.on delete_car_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);
		if(info.id == undefined) return socket.fail(func_name, {errmsg: "You need to give car.id"}, call_back);

		var  car = {
			id: info.id
		};

		database.delete_user_car(car, {account_user_id: socket.account.id}, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error delete_user_car", code: err.code}, call_back);
			if(results.affectedRows == 0) 
				return socket.fail(func_name, {errmsg: "affectedRows = 0"}, call_back);
			return socket.successful(func_name, results, call_back);
		});

	});



	socket.on('get_public_car', function(info, call_back){

		var func_name = "get_public_car";

		console.log('socket.on get_public_car', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(info.id == undefined) return socket.fail(func_name, {errmsg: "You need to give car.id"}, call_back);

		var  car = {
			id:	info.id
		};

		database.get_car(car, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error db_func_name", code: err.code}, call_back);
			if(results.length == 0) return socket.fail(func_name, {errmsg: "no car with this id"}, call_back);
			if(!results[0].public) return socket.fail(func_name, {errmsg: "this car is not public"}, call_back);
			return socket.successful(func_name, results[0], call_back);
		});

	});

}
