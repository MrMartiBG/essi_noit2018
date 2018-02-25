var db  = function(connection){
	this.register_user = function register(user, func){
		connection.query('INSERT INTO users SET ?',user, func);
	}

	this.login_user = function login(user, func){
		connection.query("SELECT * FROM users WHERE user_name = '" + user.user_name + "'", func);
	}

	return this;
};

module.exports = db;