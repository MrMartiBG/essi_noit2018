module.exports = function(database, validation){

	this.on_connection = function on_connection(socket){
		console.log('user connected', socket.id);

		socket.on('disconnect', function(){
			console.log('user disconnected', socket.id);
		});

		socket.fail = function fail(function_name, info, call_back){
			console.log(function_name + ' - fail', info);
			call_back({function_name: function_name, status: "fail", info: info});
			return info;
		}
		socket.successful = function successful(function_name, info, call_back){
			console.log(function_name + ' - successful', info);
			call_back({function_name: function_name, status: "successful", info: info});
			return info;
		}
		socket.arguments_valid = function arguments_valid(info, call_back){
			if(info == null || call_back == null){
				socket.emit('client_error','info or call_back is null(undefined)');
				return false;
			}
			return true;
		}

		socket.authenticated = false;

		require('./sockets/authentication.js')	(socket, database, validation);
		require('./sockets/car.js')				(socket, database, validation);
		require('./sockets/service.js')			(socket, database, validation);
		require('./sockets/modification.js')	(socket, database, validation);

	}

	return this;
}
