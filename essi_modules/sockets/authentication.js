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

		console.log('socket.on register_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail("register_user", {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail("register_user", {errmsg: "email is undefined"}, call_back);
		if(info.first_name == undefined) return socket.fail("register_user", {errmsg: "first_name is undefined"}, call_back);
		if(info.last_name == undefined) return socket.fail("register_user", {errmsg: "last_name is undefined"}, call_back);

		info.password = generate_password();

		var account = 	{
			email:		info.email,
			password:	info.password,
			type: "user"
		};

		database.add_account(account, function(err, results){
			if(err) return socket.fail("register_user", {errmsg: "database error add_account", code: err.code}, call_back);
			
			var user = {
				account_id: results.insertId,
				first_name: info.first_name,
				last_name: 	info.last_name
			}

			database.add_user(user, function(err, results){
				if(err){
					database.delete_account({id: user.account_id}, function(){});
					return socket.fail("register_user", {errmsg: "database error add_user", code: err.code}, call_back);
				}
				send_password_mail(info.email, info.password);
				return socket.successful("register_user", user, call_back);
			});
		});
	});


	socket.on('register_service', function(info, call_back){

		console.log('socket.on register_service', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail("register_service", {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail("register_service", {errmsg: "email is undefined"}, call_back);
		if(info.name == undefined) return socket.fail("register_service", {errmsg: "name is undefined"}, call_back);

		info.password = generate_password();

		var account = 	{
			email:		info.email,
			password:	info.password,
			type: "service"
		};

		database.add_account(account, function(err, results){
			if(err) return socket.fail("register_service", {errmsg: "database error add_account", code: err.code}, call_back);
			
			var service = {
				account_id: results.insertId,
				name: info.name
			}

			database.add_service(service, function(err, results){
				if(err){
					database.delete_account({id: service.account_id}, function(){});
					return socket.fail("register_service", {errmsg: "database error add_service", code: err.code}, call_back);
				}
				send_password_mail(info.email, info.password);
				return socket.successful("register_service", service, call_back);
			});
		});
	});



	socket.on('login_user', function(info, call_back){

		console.log('socket.on login_user', info);
		if(!socket.arguments_valid(info, call_back)) return false;

		if(socket.authenticated) return socket.fail("login_user", {errmsg: "already in account"}, call_back);
		if(info.email == undefined) return socket.fail("login_user", {errmsg: "email is undefined"}, call_back);
		if(info.password == undefined) return socket.fail("login_user", {errmsg: "password is undefined"}, call_back);

		var account = 	{
			email:	info.email
		};

		database.get_account(account, function(err, results){
			if(err) return socket.fail("login_user", {errmsg: "database error get_account", code: err.code}, call_back);

			if(results.length == 0 || results[0].password != info.password)
				return socket.fail("login_user", {errmsg: "wrong email or password"}, call_back);
			delete results[0].password;
			socket.account = results[0];
			socket.authenticated = true;

			return socket.successful("login_user", socket.account, call_back);
		});

	});
}
