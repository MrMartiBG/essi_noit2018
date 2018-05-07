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

}
