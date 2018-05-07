module.exports = function(socket,database){


	socket.on('func_name', function(info, call_back){
		
		socket.validate_worker_rights("func_name", info, call_back, 0b1000, function(func_name, info, call_back){

			var serivce = {
				account_service_id: info.account_service_id
			}

			database.db_func(serivce, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error db_func", code: err}, call_back);
				return socket.successful(func_name, results, call_back);
			});

		});

	});

}
