module.exports = function(mysql,db_user){

	db_user.database = "essi";
	this.connection = mysql.createConnection(db_user);
	this.connection.connect(function(err) {
		if (err){
			console.log("Error: ",	err.code);
			process.exit(1);
		}
		console.log("Connected to database!");
	});



	this.add_account = function add_account(account, func){
		this.connection.query("INSERT INTO account SET ?", account, func);
	}
	this.get_account = function get_account(account, func){
		this.connection.query("SELECT * FROM account WHERE ?", account, func);
	}
	this.set_accout_password = function set_accout_password(set, where, func){
		this.connection.query("UPDATE essi.account SET ? WHERE ?", [set, where], func);
	}
	this.delete_account = function delete_account(account, func){
		this.connection.query("DELETE FROM essi.account WHERE ?", account, func);
	}

	this.add_user = function add_user(user, func){
		this.connection.query("INSERT INTO user SET ?", user, func);
	}
	this.add_service = function add_service(service, func){
		this.connection.query("INSERT INTO service SET ?", service, func);
	}



	this.get_user_data = function get_user_data(user, func){
		this.connection.query("SELECT * FROM user WHERE ?", user, func);
	}

	return this;
};
