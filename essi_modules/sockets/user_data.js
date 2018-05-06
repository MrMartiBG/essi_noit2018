module.exports = function(socket,database){


	socket.on('get_data_this_user', function(info, call_back){

		console.log('socket.on get_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("get_data_this_user", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail("get_data_this_user", {errmsg: "You are not user"}, call_back);

		var user = 	{
			account_id:	socket.account.id
		};

		database.get_user_data(user, function(err, results){
			if(err) return socket.fail("get_data_this_user", {errmsg: "database error get_user_data", code: err.code}, call_back);
			return socket.successful("get_data_this_user", results[0], call_back);
		});

	});

	socket.on('set_data_this_user', function(info, call_back){

		console.log('socket.on set_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("set_data_this_user", {errmsg: "You are not in account"}, call_back);

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
			if(err) return socket.fail("set_data_this_user", {errmsg: "database error set_user_data", code: err.code}, call_back);
			return socket.successful("set_data_this_user", new_user, call_back);
		});
	});

}
