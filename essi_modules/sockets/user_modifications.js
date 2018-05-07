module.exports = function(socket,database){


	socket.on('add_modification_this_user', function(info, call_back){

		console.log('socket.on add_modification_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("add_modification_this_user", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail("add_modification_this_user", {errmsg: "You are not user"}, call_back);

		if(info.car_id == undefined) return socket.fail("add_modification_this_user", {errmsg: "car_id is undefined"}, call_back);
		if(info.type == undefined) return socket.fail("add_modification_this_user", {errmsg: "type is undefined"}, call_back);
		if(info.date == undefined) return socket.fail("add_modification_this_user", {errmsg: "date is undefined"}, call_back);
		if(info.mileage == undefined) return socket.fail("add_modification_this_user", {errmsg: "mileage is undefined"}, call_back);
		if(info.zone == undefined) return socket.fail("add_modification_this_user", {errmsg: "zone is undefined"}, call_back);
		if(info.part == undefined) return socket.fail("add_modification_this_user", {errmsg: "part is undefined"}, call_back);

		var  car = {
			car_id:	info.car_id
		};
		var  user = {
			account_user_id:	socket.account.id
		};
		var modification = {
			car_id: info.car_id,
			type: info.type,
			date: info.date,
			mileage: info.mileage,
			zone: info.zone,
			part: info.part,
		};

		// NO!
		// if(info.worker_id != undefined) modification.worker_id = info.worker_id;
		// if(info.service_id != undefined) modification.service_id = info.service_id;
		if(info.part_make != undefined) modification.part_make = info.part_make;
		if(info.info != undefined) modification.info = info.info;


		database.get_user_car(user, car, function(err, results){
			if(err) return socket.fail("add_modification_this_user", {errmsg: "database error get_user_car", code: err.code}, call_back);
			if(results.length == 0)  return socket.fail("add_modification_this_user", {errmsg: "no match - car.id and account.id"}, call_back);
			
			database.add_modification(modification, function(err, results){
				if(err) return socket.fail("add_modification_this_user", {errmsg: "database error add_modification", code: err.code}, call_back);
				return socket.successful("add_modification_this_user", modification, call_back);
			});
		});

	});


	socket.on('get_modification_this_user', function(info, call_back){

		console.log('socket.on get_modification_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("get_modification_this_user", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail("get_modification_this_user", {errmsg: "You are not user"}, call_back);

		var  user = {
			account_user_id: socket.account.id
		};

		database.get_modifications(user, function(err, results){
			if(err) return socket.fail("get_modification_this_user", {errmsg: "database error get_modifications", code: err.code}, call_back);
			return socket.successful("get_modification_this_user", results, call_back);
		});

	});


	socket.on('report_modification_problem', function(info, call_back){

		var func_name = "report_modification_problem";

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);
		if(info.modification_id == undefined) return socket.fail(func_name, {errmsg: "You need to give modification_id"}, call_back);

		var user = {
			account_user_id: socket.account.id
		}
		var modification = {
			id: info.modification_id
		}

		database.get_user_car_modification(user, modification, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_user_car_modification", code: err.code}, call_back);
			if(results.length == 0) return socket.fail(func_name, {errmsg: "you are not the owner of this car"}, call_back);

			var notification = {
				to_account_id: results[0].service_id,
				from_account_id: socket.account.id,
				car_id: results[0].car_id,
				modification_id: info.modification_id,
				status: "waiting",
				type: "user_to_service_report_modification_problem",
				date: new Date()
			};

			database.add_notification(notification, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error add_notification", code: err}, call_back);
				return socket.successful(func_name, notification, call_back);
			});
		});

	});

}


