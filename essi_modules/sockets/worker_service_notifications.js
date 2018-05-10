module.exports = function(socket,database){


	socket.on('get_notifications_by_worker', function(info, call_back){
		
		socket.validate_worker_rights("get_notifications_by_worker", info, call_back, 0b111, function(func_name, info, call_back){

			var serivce = {
				to_account_id: info.account_service_id
			}


			database.get_notifications_by_worker(serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_notifications_by_worker", code: err}, call_back);
				return socket.successful(func_name, results, call_back);
			});

		});

	});

	socket.on('set_status_notification_by_worker', function(info, call_back){

		socket.validate_worker_rights("set_status_notification_by_worker", info, call_back, 0b100, function(func_name, info, call_back){

			if(info.id == undefined) return socket.fail(func_name, {errmsg: "id is undefined"}, call_back);
			if(info.status == undefined) return socket.fail(func_name, {errmsg: "status is undefined"}, call_back);

			var  notification = {
				id: info.id
			};
			var account = {
				to_account_id: info.account_service_id
			}

			database.get_notification(notification, account, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_notification", code: err.code}, call_back);
				if(results.length == 0) return socket.fail(func_name, {errmsg: "no notification with this id for this account"}, call_back);
				if(results[0].status != "waiting") return socket.fail(func_name, {errmsg: "notification is not waiting"}, call_back);
				if(info.status != "accept"){
					database.set_notifications({status: "decline"}, {id: info.id}, function(){});
					return socket.successful(func_name, {status: "decline"}, call_back);
				}
				if(results[0].type == "user_to_service_add_car"){

					var service_car = {
						account_service_id: results[0].to_account_id,
						car_id: results[0].car_id
					}

					database.add_service_car(service_car, function(err, results){
						if(err) 
							return socket.fail(func_name, {errmsg: "database error add_service_car", code: err.code}, call_back);
						database.set_notifications({status: "accept"}, {id: info.id}, function(){});
						socket.make_service_log({account_service_id: info.account_service_id, notification_id: info.id});
						return socket.successful(func_name, service_car, call_back);
					});
				}else{
					database.set_notifications({status: "accept"}, {id: info.id}, function(){});
					return socket.successful(func_name, {status: "accept"}, call_back);
				}

			});

		});
	});


}
