module.exports = function(database){

	this.handler = function handler(socket){
		console.log('user connected', socket.id);

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});


		socket.fail = function fail(func_name, info, call_back){
			console.log(func_name + ' - fail', info);
			call_back({func_name: func_name, status: "fail", info: info});
			return info;
		}
		socket.successful = function successful(func_name, info, call_back){
			console.log(func_name + ' - successful', info);
			call_back({func_name: func_name, status: "successful", info: info});
			return info;
		}
		socket.server_error = function server_error(func_name, info){
			console.log(func_name + ' - server_error', info);
			socket.emit('server_error', {func_name: func_name, info: info});
			return info;
		}
			

		socket.authenticated = false;

		require('./authentication.js')	(socket, database);
		require('./car.js')				(socket, database);
		require('./service.js')			(socket, database);
		require('./modification.js')	(socket, database);

	}

	return this;
}