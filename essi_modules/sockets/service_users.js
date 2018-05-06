module.exports = function(socket,database){


	socket.on('get_service_users_this_service', function(info, call_back){
		var func_name = "get_service_users_this_service";

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail(func_name, {errmsg: "You are not service"}, call_back);

		var service_user = 	{
			account_service_id:	socket.account.id
		};

		database.get_service_user(service_user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_service_user", code: err.code}, call_back);
			return socket.successful(func_name, results, call_back);
		});

	});


	socket.on('add_service_user_this_service', function(info, call_back){
		var func_name = "add_service_user_this_service";

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail(func_name, {errmsg: "You are not service"}, call_back);
		if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);
		if(info.user_rights == undefined) return socket.fail(func_name, {errmsg: "user_rights is undefined"}, call_back);

		var service_user = 	{
			account_service_id:	socket.account.id,
			account_user_id: info.account_user_id,
			user_rights: info.user_rights	
		};

		database.add_service_user(service_user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error add_service_user", code: err.code}, call_back);
			return socket.successful(func_name, service_user, call_back);
		});

	});


	socket.on('set_service_user_this_service', function(info, call_back){
		var func_name = "set_service_user_this_service";

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail(func_name, {errmsg: "You are not service"}, call_back);
		if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);
		if(info.user_rights == undefined) return socket.fail(func_name, {errmsg: "user_rights is undefined"}, call_back);

		var service = 	{
			account_service_id:	socket.account.id
		};
		var user = 	{
			account_user_id: info.account_user_id
		}

		var rights = {
			user_rights: info.user_rights	
		}

		database.set_service_user(rights, service, user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error set_service_user", code: err}, call_back);
			return socket.successful(func_name, rights, call_back);
		});

	});


	socket.on('delete_service_user_this_service', function(info, call_back){
		var func_name = "delete_service_user_this_service";

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail(func_name, {errmsg: "You are not service"}, call_back);
		if(info.account_user_id == undefined) return socket.fail(func_name, {errmsg: "account_user_id is undefined"}, call_back);

		var service = 	{
			account_service_id:	socket.account.id
		};
		var user = 	{
			account_user_id: info.account_user_id
		}

		database.delete_service_user(service, user, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error delete_service_user", code: err.code}, call_back);
			return socket.successful(func_name, {}, call_back);
		});

	});


}