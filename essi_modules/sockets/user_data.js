module.exports = function(socket,database){


	socket.on('get_data_this_user', function(info, call_back){

		console.log('socket.on get_data_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;
		
		if(!socket.authenticated) return socket.fail("set_data_this_user", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail("get_data_this_user", {errmsg: "You are not user"}, call_back);

		var user = 	{
			account_id:	socket.account.id
		};

		database.get_user_data(user, function(err, results){
			if(err) return socket.fail("get_data_this_user", {errmsg: "database error get_account", code: err.code}, call_back);
			return socket.successful("get_data_this_user", results[0], call_back);
		});

	});

	// socket.on('set_data_this_user', function(info, call_back){

	// 	console.log('socket.on set_data_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail("set_data_this_user", {errmsg: "You are not in account"}, call_back);
	// });

}
