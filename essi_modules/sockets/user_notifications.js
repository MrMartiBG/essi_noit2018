module.exports = function(socket,database){


	socket.on('get_notifications_this_user', function(info, call_back){

		var func_name = "get_notifications_this_user";

		console.log('socket.on get_notifications_this_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

		var  notification = {
			to_account_id: socket.account.id
		};

		database.get_notifications(notification, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_notifications", code: err.code}, call_back);
			return socket.successful(func_name, results, call_back);
		});

	});

	
	// socket.on('set_status_notification_this_user', function(info, call_back){

	// 	var func_name = "set_status_notification_this_user";

	// 	console.log('socket.on set_status_notification_this_user', info);
	// 	if(!socket.arguments_valid(info, call_back)) return false;

	// 	if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);
	// 	if(socket.account.type != "user") return socket.fail(func_name, {errmsg: "You are not user"}, call_back);

	// 	// var  notification = {
	// 	// 	to_account_id: socket.account.id
	// 	// };

	// 	// database.get_notifications(notification, function(err, results){
	// 	// 	if(err) return socket.fail(func_name, {errmsg: "database error get_notifications", code: err.code}, call_back);
	// 	// 	return socket.successful(func_name, results, call_back);
	// 	// });

	// });


}


