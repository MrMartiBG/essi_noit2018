module.exports = function(socket,database){


	socket.on('get_data_this_user', function(info, call_back){

		var func_name = "get_data_this_user";

		console.log('socket.on get_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

		var user = 	{
			account_id:	socket.account.id
		};

		database.get_user_data(user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_user_data", code: err.code}, call_back);
			return socket.successful(func_name, results[0], call_back);
		});

	});

	socket.on('set_data_this_user', function(info, call_back){

		var func_name = "set_data_this_user";

		console.log('socket.on set_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

		var user = 	{
			account_id:	socket.account.id
		};

		var new_user = {};
		if(info.password != undefined) new_user.password = info.password;
		if(info.first_name != undefined) new_user.first_name = info.first_name;
		if(info.last_name != undefined) new_user.last_name = info.last_name;
		if(info.phone != undefined) new_user.phone = info.phone;
		if(info.birthdate != undefined) new_user.birthdate = info.birthdate;
		if(info.country != undefined) new_user.country = info.country;
		if(info.city != undefined) new_user.city = info.city;
		if(info.info != undefined) new_user.info = info.info;

		database.set_user_data(new_user, user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error set_user_data", code: err.code}, call_back);
			return socket.successful(func_name, new_user, call_back);
		});
	});


	socket.on('get_service_users_this_user', function(info, call_back){

		var func_name = "get_service_users_this_user";

		console.log('socket.on get_service_users_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

		var user = 	{
			account_user_id: socket.account.id
		};

		database.get_service_user(user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_service_user", code: err.code}, call_back);
			return socket.successful(func_name, results, call_back);
		});

	});
}
