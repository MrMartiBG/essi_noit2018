module.exports = function(socket,database){


	socket.on('get_car_modifications_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("get_car_modifications_by_worker", info, call_back, 0b1000, function(func_name, info, call_back){

			if(info.car_id == undefined) return socket.fail(func_name, {errmsg: "car_id is undefined"}, call_back);

			var car = {
				car_id: info.car_id
			}
			var service = {
				account_service_id: info.account_service_id
			}

			database.get_service_car_by_worker(car, service, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_service_car_by_worker", code: err}, call_back);
				if(results.length == 0) return socket.fail(func_name, {errmsg: "no match service and car in service_car"}, call_back);

				database.get_modifications_by_worker(car, function(err, results){
					if(err) return socket.fail(func_name, {errmsg: "database error get_modifications_by_worker", code: err}, call_back);

					return socket.successful(func_name, results, call_back);
				});
			});

		});

	});


	socket.on('add_car_modification_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("add_car_modification_by_worker", info, call_back, 0b1000, function(func_name, info, call_back){

			if(info.car_id == undefined) return socket.fail(func_name, {errmsg: "car_id is undefined"}, call_back);

			var car = {
				car_id: info.car_id
			}
			var service = {
				account_service_id: info.account_service_id
			}

			database.get_service_car_by_worker(car, service, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_service_car_by_worker", code: err}, call_back);
				if(results.length == 0) return socket.fail(func_name, {errmsg: "no match service and car in service_car"}, call_back);

				if(info.car_id == undefined) return socket.fail(func_name, {errmsg: "car_id is undefined"}, call_back);
				if(info.type == undefined) return socket.fail(func_name, {errmsg: "type is undefined"}, call_back);
				if(info.date == undefined) return socket.fail(func_name, {errmsg: "date is undefined"}, call_back);
				if(info.mileage == undefined) return socket.fail(func_name, {errmsg: "mileage is undefined"}, call_back);
				if(info.zone == undefined) return socket.fail(func_name, {errmsg: "zone is undefined"}, call_back);
				if(info.part == undefined) return socket.fail(func_name, {errmsg: "part is undefined"}, call_back);

				var modification = {	
					worker_id: socket.account.id,
					service_id: info.account_service_id,
					car_id: info.car_id,
					type: info.type,
					date: info.date,
					mileage: info.mileage,
					zone: info.zone,
					part: info.part
				}

				if(info.part_make != undefined) modification.part_make = info.part_make;
				if(info.info != undefined) modification.info = info.info;

				database.add_modification_by_worker(modification, function(err, results){
					if(err) return socket.fail(func_name, {errmsg: "database error add_modification_by_worker", code: err}, call_back);
					return socket.successful(func_name, modification, call_back);
				});
			});

		});

	});

}
