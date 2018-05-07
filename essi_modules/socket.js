module.exports = function(database,transporter){

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
		socket.account = {};

		require('./sockets/authentication.js')		(socket, database, transporter);
		require('./sockets/user_data.js')			(socket, database);
		require('./sockets/user_cars.js')			(socket, database);
		require('./sockets/user_modifications.js')	(socket, database);
		require('./sockets/user_notifications.js')	(socket, database);
		require('./sockets/service_data.js')		(socket, database);
		require('./sockets/service_users.js')		(socket, database);

	}

	return this;
}


	// socket.on('add_car_to_service_this_user', function(info, call_back){

	// 	var func_name = "add_car_to_service_this_user"

	// 	console.log('socket.on', func_name, info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

	// 	var object = {
	// 		args: info.args
	// 	};

	// 	database.db_func_name(object, function(err, results){
	// 		if(err) return socket.fail(func_name, {errmsg: "database error db_func_name", code: err.code}, call_back);
	// 		return socket.successful(func_name, results, call_back);
	// 	});

	// });