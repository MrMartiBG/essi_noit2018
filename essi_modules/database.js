var db  = function(connection){

	this.register_user = function register_user(user, func){
		connection.query('INSERT INTO user SET ?',user, func);
	}
	this.fetch_user = function fetch_user(username, func){
		connection.query("SELECT * FROM user WHERE username = '" + username + "'", func);
	}

	this.add_user_info = function add_user_info(user_info, func){
		connection.query('INSERT INTO user_info SET ?',user_info, func);
	}
	this.fetch_user_info = function fetch_user_info(user_id, func){
		connection.query("SELECT * FROM user_info WHERE user_id = '" + user_id + "'", func);
	}

	return this;
};

module.exports = db;