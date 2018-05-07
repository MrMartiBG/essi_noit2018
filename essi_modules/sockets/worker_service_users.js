module.exports = function(socket,database){


	socket.on('get_service_users_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("get_service_users_by_worker", info, call_back, 0b0001, function(func_name, info, call_back){

			var serivce = {
				account_service_id: info.account_service_id
			}

			database.get_service_users_by_worker(serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_service_users_by_worker", code: err}, call_back);
				return socket.successful(func_name, results, call_back);
			});

		});

	});


	// socket.on('add_service_user_by_worker', function(info, call_back){
		
	// 	socket.validate_worker_rights("add_service_user_by_worker", info, call_back, 0b0001, function(func_name, info, call_back){

	// 		var serivce = {
	// 			account_service_id: info.account_service_id
	// 		}

	// 		database.add_service_user_by_worker(serivce, function(err, results){
	// 			if(err) return socket.fail(func_name, {errmsg: "database error add_service_user_by_worker", code: err}, call_back);
	// 			return socket.successful(func_name, results, call_back);
	// 		});

	// 	});

	// });


	// socket.on('set_service_user_rights_by_worker', function(info, call_back){
		
	// 	socket.validate_worker_rights("set_service_user_rights_by_worker", info, call_back, 0b0001, function(func_name, info, call_back){

	// 		var serivce = {
	// 			account_service_id: info.account_service_id
	// 		}

	// 		database.set_service_user_by_worker(serivce, function(err, results){
	// 			if(err) return socket.fail(func_name, {errmsg: "database error set_service_user_by_worker", code: err}, call_back);
	// 			return socket.successful(func_name, results, call_back);
	// 		});

	// 	});

	// });


	// socket.on('delete_service_user_by_worker', function(info, call_back){
		
	// 	socket.validate_worker_rights("delete_service_user_by_worker", info, call_back, 0b0001, function(func_name, info, call_back){

	// 		var serivce = {
	// 			account_service_id: info.account_service_id
	// 		}

	// 		database.delete_service_user_by_worker(serivce, function(err, results){
	// 			if(err) return socket.fail(func_name, {errmsg: "database error delete_service_user_by_worker", code: err}, call_back);
	// 			return socket.successful(func_name, results, call_back);
	// 		});

	// 	});

	// });

}
