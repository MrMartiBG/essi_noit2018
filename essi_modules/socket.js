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

		socket.validate_worker_rights = function validate_worker_rights(func_name, info, call_back, user_rights, return_function){
			
			console.log('socket.on', func_name, info);

			if(!socket.arguments_valid(info, call_back)) return false;

			if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
			if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);
			if(info.account_service_id == undefined) return socket.fail(func_name, {errmsg: "account_service_id is undefined"}, call_back);

			var service_user_by_service = {
				account_service_id:	info.account_service_id
			};
			var service_user_by_worker = {
				account_user_id:	socket.account.id
			};

			database.get_service_user_rights(service_user_by_service, service_user_by_worker, function(err, results){
				if(err) return socket.fail(func_name, {errmsg: "database error get_service_user_rights", code: err.code}, call_back);
				if(results.length == 0) 
					return socket.fail(func_name, {errmsg: "You are not in this service"}, call_back);
				if(!(results[0].user_rights & user_rights))
					return socket.fail(func_name, {errmsg: "You are not allowed to perform this action!"}, call_back);
				return return_function(func_name, info, call_back);
			});
		}

		socket.make_notification = function make_notification(info){

			if(info.to_account_id == undefined) return console.log("error - make_notification - to_account_id is undefined");
			if(info.from_account_id == undefined) return console.log("error - make_notification - from_account_id is undefined");
			if(info.status == undefined) return console.log("error - make_notification - status is undefined");
			if(info.type == undefined) return console.log("error - make_notification - type is undefined");

			var notification = {
				to_account_id: info.to_account_id, 
				from_account_id: info.from_account_id, 
				car_id: info.car_id, 
				status: info.status, 
				type: info.type, 
				date: new Date
			};

			if(info.car_id != undefined) notification.car_id = info.car_id;
			if(info.modification_id != undefined) notification.modification_id = info.modification_id;

			database.add_notification(notification, function(error, results){

			if(info.account_service_id == undefined) return true;

				var log = {
					account_user_id: socket.account.id,
					account_service_id: info.account_service_id,
					date: new Date
				};

				if(results.insertId != undefined) log.notification_id = results.insertId;

				console.log(log);

				database.add_log(log, function(error, results){
					if(error) return console.log("error - make_service_log - " + error.code);
					return console.log("successful - make_service_log");
				});

				if(error) return console.log("error - make_notification - " + error.code);
				return console.log("successful - make_notification");
			});

		}

		socket.make_service_log = function make_service_log(info){

			if(info.account_service_id == undefined) return console.log("error - make_service_log - account_service_id is undefined");

			var log = {
				account_user_id: socket.account.id,
				account_service_id: info.account_service_id,
				date: new Date
			};

			if(info.notification_id != undefined) log.notification_id = info.notification_id;

			database.add_log(log, function(error){
				if(error) return console.log("error - make_service_log - " + error.code);
				return console.log("successful - make_service_log");
			});
		}

		socket.authenticated = false;
		socket.account = {};

		require('./sockets/authentication.js')					(socket, database, transporter);
		require('./sockets/user_data.js')						(socket, database);
		require('./sockets/user_cars.js')						(socket, database);
		require('./sockets/user_modifications.js')				(socket, database);
		require('./sockets/user_notifications.js')				(socket, database);
		require('./sockets/service_data.js')					(socket, database);
		require('./sockets/service_users.js')					(socket, database);
		require('./sockets/worker_cars.js')						(socket, database);
		require('./sockets/worker_modifications.js')			(socket, database);
		require('./sockets/worker_service_users.js')			(socket, database);
		require('./sockets/worker_service_notifications.js')	(socket, database);

	}

	return this;
}


	// --> template on user <---

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




	// --> template on worker <---

	// socket.on('func_name', function(info, call_back){
		
	// 	socket.validate_worker_rights("func_name", info, call_back, 0b1000, function(func_name, info, call_back){

	// 		var serivce = {
	// 			account_service_id: info.account_service_id
	// 		}

	// 		database.db_func(serivce, function(err, results){
	// 			if(err) return socket.fail(func_name, {errmsg: "database error db_func", code: err}, call_back);
	// 			return socket.successful(func_name, results, call_back);
	// 		});

	// 	});

	// });
