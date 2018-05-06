module.exports = function(socket,database){


	socket.on('get_data_this_service', function(info, call_back){

		console.log('socket.on get_data_this_service', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("get_data_this_service", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail("get_data_this_service", {errmsg: "You are not service"}, call_back);

		var service = 	{
			account_id:	socket.account.id
		};

		database.get_service_data(service, function(err, results){
			if(err) return socket.fail("get_data_this_service", {errmsg: "database error get_service_data", code: err.code}, call_back);
			return socket.successful("get_data_this_service", results[0], call_back);
		});

	});

	socket.on('set_data_this_service', function(info, call_back){

		console.log('socket.on set_data_this_service', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail("set_data_this_service", {errmsg: "You are not in account"}, call_back);
		if(socket.account.type != "service") return socket.fail("get_data_this_service", {errmsg: "You are not service"}, call_back);

		var service = 	{
			account_id:	socket.account.id
		};

		var new_service = {};
		if(info.password != undefined) new_service.password = info.password;
		if(info.name != undefined) new_service.name = info.name;
		if(info.country != undefined) new_service.country = info.country;
		if(info.city != undefined) new_service.city = info.city;
		if(info.address != undefined) new_service.address = info.address;
		if(info.contact_info != undefined) new_service.contact_info = info.contact_info;
		if(info.info != undefined) new_service.info = info.info;

		database.set_service_data(new_service, service, function(err, results){
			if(err) return socket.fail("set_data_this_service", {errmsg: "database error set_service_data", code: err.code}, call_back);
			return socket.successful("set_data_this_service", new_service, call_back);
		});
	});

}
