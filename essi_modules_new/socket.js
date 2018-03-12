module.exports = function(database){

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
		socket.client_error = function client_error(function_name, info){
			console.log(function_name + ' - client_error', info);
			socket.emit('client_error', {function_name: function_name, info: info});
			return info;
		}
			
		socket.authenticated = false;

		require('./sockets/authentication.js')	(socket, database);
		require('./sockets/car.js')				(socket, database);
		require('./sockets/service.js')			(socket, database);
		require('./sockets/modification.js')	(socket, database);

	}

	return this;
}