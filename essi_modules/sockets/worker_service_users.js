module.exports = function(socket,database){


	socket.on('get_service_users_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("get_service_users_by_worker", info, call_back, 0b001, function(func_name, info, call_back){

			var serivce = {
				account_service_id: info.account_service_id
			}

			database.get_service_users_by_worker(serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_service_users_by_worker", code: err}, call_back);
				return socket.successful(func_name, results, call_back);
			});

		});

	});


	socket.on('add_service_user_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("add_service_user_by_worker", info, call_back, 0b001, function(func_name, info, call_back){

			if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);
			if(info.user_rights == undefined) return socket.fail(func_name, {errmsg: "user_rights is undefined"}, call_back);

			var serivce_user = {
				account_service_id: info.account_service_id,
				account_user_id: info.account_user_id,
				user_rights: info.user_rights
			}

			database.add_service_user_by_worker(serivce_user, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error add_service_user_by_worker", code: err}, call_back);

				// var notification = {
				// 	account_service_id: info.account_service_id,
				// 	to_account_id: info.account_user_id, 
				// 	from_account_id: info.account_service_id, 
				// 	status: "info", 
				// 	type: "added_to_service_user", 
				// 	date: new Date
				// };

				// socket.make_notification(notification);

				return socket.successful(func_name, serivce_user, call_back);
			});

		});

	});


	socket.on('set_service_user_rights_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("set_service_user_rights_by_worker", info, call_back, 0b001, function(func_name, info, call_back){

			if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);
			if(info.user_rights == undefined) return socket.fail(func_name, {errmsg: "user_rights is undefined"}, call_back);

			var serivce_user_new = {
				account_service_id: info.account_service_id,
				account_user_id: info.account_user_id,
				user_rights: info.user_rights
			}
			var user = {
				account_user_id: info.account_user_id
			}
			var serivce = {
				account_service_id: info.account_service_id
			}

			database.set_service_user_by_worker(serivce_user_new, user, serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error set_service_user_by_worker", code: err}, call_back);
				return socket.successful(func_name, serivce_user_new, call_back);
			});

		});

	});


	socket.on('delete_service_user_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("delete_service_user_by_worker", info, call_back, 0b001, function(func_name, info, call_back){

			if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);

			var serivce = {
				account_service_id: info.account_service_id
			}
			var user = {
				account_user_id: info.account_user_id
			}

			database.delete_service_user_by_worker(user, serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error delete_service_user_by_worker", code: err}, call_back);
				return socket.successful(func_name, user, call_back);
			});

		});

	});

}

