module.exports = function(socket,database){


	socket.on('add_car_to_service_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("add_car_to_service_by_worker", info, call_back, 0b100, function(func_name, info, call_back){


			if(info.car_id == undefined) return socket.fail(func_name, {errmsg: "car_id is undefined"}, call_back);

			var car = {
				car_id: info.car_id
			}

			database.get_user_car_by_worker(car, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_user_car_by_worker", code: err.code}, call_back);
				if(results.length == 0) return socket.fail(func_name, {errmsg: "no car with this id"}, call_back);

				var notification = {
					to_account_id: results[0].account_user_id,
					from_account_id: info.account_service_id,
					car_id: info.car_id,
					status: "waiting",
					type: "service_to_user_add_car",
					date: new Date()
				};

				database.add_notification(notification, function(err, results){
					if(err) return socket.fail(func_name, {errmsg: "database error add_notification", code: err}, call_back);
					return socket.successful(func_name, notification, call_back);
				});
			});
		});

	});


	socket.on('get_service_cars_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("get_service_cars_by_worker", info, call_back, 0b110, function(func_name, info, call_back){

			var serivce = {
				account_service_id: info.account_service_id
			}

			database.get_cars_by_worker(serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_cars_by_worker", code: err}, call_back);
				return socket.successful(func_name, results, call_back);
			});
		});

	});


	socket.on('delete_service_car_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("delete_service_car_by_worker", info, call_back, 0b100, function(func_name, info, call_back){

			if(info.car_id == undefined) return socket.fail(func_name, {errmsg: "car_id is undefined"}, call_back);

			var car = {
				car_id: info.car_id
			}
			var serivce = {
				account_service_id: info.account_service_id
			}

			database.delete_service_car_by_worker(car, serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error delete_service_car_by_worker", code: err.code}, call_back);
				if(results.affectedRows == 0) return socket.fail(func_name, {errmsg: "affectedRows = 0"}, call_back);
				return socket.successful(func_name, car, call_back);
			});

		});
	});

}
