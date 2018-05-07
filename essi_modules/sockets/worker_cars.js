module.exports = function(socket,database){


	socket.on('function_name_here', function(info, call_back){

		var func_name = "function_name_here";

		console.log('socket.on', func_name, info);
		socket.validate_worker_rights(func_name, info, call_back, 0b0000, function(){
			return socket.successful(func_name, true, call_back);
		});

	});

}
