module.exports = function(socket,database,transporter){

	function send_password_mail(to_email, password, call_back){
		var mailOptions = {
			to: to_email,
			subject: 'New password',
			text: 'Your password for essi is: ' + password
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
			}else{
				console.log('Email sent: ' + info.response);
			}
		});
	}

	function generate_password(){
		var passkeys = 	[ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
		 				  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z',
		 				  'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R',
		 				  'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F',
		 				  'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B',
		 				  'N', 'M', '1', '2', '3', '4', '5', '6', '7', '8',
		 				  '9', '0', '-', '=', '!', '@', '#', '$', '%', '^',
		 				  '&', '*', '(', ')', '_', '+' ];
		var password = "";
		for(var i = 0; i < 16; i++){
			password += passkeys[Math.floor(Math.random()*passkeys.length)];
		}

		return password;
	}

	socket.on('register_user', function(info, call_back){

		var func_name = 'register_user';

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail(func_name, {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail(func_name, {errmsg: "email is undefined"}, call_back);
		if(info.first_name == undefined) return socket.fail(func_name, {errmsg: "first_name is undefined"}, call_back);
		if(info.last_name == undefined) return socket.fail(func_name, {errmsg: "last_name is undefined"}, call_back);

		info.password = generate_password();

		var account = 	{
			email:		info.email,
			password:	info.password,
			type: "user"
		};

		database.add_account(account, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error add_account", code: err.code}, call_back);
			
			var user = {
				account_id: results.insertId,
				first_name: info.first_name,
				last_name: 	info.last_name
			}

			database.add_user(user, function(err, results){
				if(err){
					database.delete_account({id: user.account_id}, function(){});
					return socket.fail(func_name, {errmsg: "database error add_user", code: err.code}, call_back);
				}
				send_password_mail(info.email, info.password);
				return socket.successful(func_name, user, call_back);
			});
		});
	});


	socket.on('register_service', function(info, call_back){

		var func_name = 'register_service';

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail(func_name, {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail(func_name, {errmsg: "email is undefined"}, call_back);
		if(info.name == undefined) return socket.fail(func_name, {errmsg: "name is undefined"}, call_back);

		info.password = generate_password();

		var account = 	{
			email:		info.email,
			password:	info.password,
			type: "service"
		};

		database.add_account(account, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error add_account", code: err.code}, call_back);
			
			var service = {
				account_id: results.insertId,
				name: info.name
			}

			database.add_service(service, function(err, results){
				if(err){
					database.delete_account({id: service.account_id}, function(){});
					return socket.fail(func_name, {errmsg: "database error add_service", code: err.code}, call_back);
				}
				send_password_mail(info.email, info.password);
				return socket.successful(func_name, service, call_back);
			});
		});
	});


	socket.on('login_account', function(info, call_back){

		var func_name = 'login_account';

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail(func_name, {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail(func_name, {errmsg: "email is undefined"}, call_back);
		if(info.password == undefined) return socket.fail(func_name, {errmsg: "password is undefined"}, call_back);

		var account = 	{
			email:	info.email
		};

		database.get_account(account, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error get_account", code: err.code}, call_back);

			if(results.length == 0 || results[0].password != info.password)
				return socket.fail(func_name, {errmsg: "wrong email or password"}, call_back);
			
			socket.account = results[0];
			socket.authenticated = true;
			delete results[0].password;

			return socket.successful(func_name, results[0], call_back);
		});

	});


	socket.on('generate_new_password', function(info, call_back){

		var func_name = 'generate_new_password';

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail(func_name, {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail(func_name, {errmsg: "email is undefined"}, call_back);

		info.password = generate_password();

		var new_pass = {
			password: info.password
		}
		var account = 	{
			email:	info.email
		};

		database.set_accout_password(new_pass, account, function(err, results){
			if(err) return socket.fail(func_name, {errmsg: "database error set_accout_password", code: err.code}, call_back);

			send_password_mail(info.email, info.password);
			return socket.successful(func_name, {}, call_back);
		});

	});


	socket.on('logout_account', function(info, call_back){

		var func_name = 'logout_account';

		console.log('socket.on', func_name, info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(!socket.authenticated) return socket.fail(func_name, {errmsg: "You are not in account"}, call_back);

		socket.account = {};
		socket.authenticated = false;

		return socket.successful(func_name, socket.account, call_back);
	});

}
