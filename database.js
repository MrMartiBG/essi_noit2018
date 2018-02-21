var db  = function(connection){
	this.register = function register(user, func){
		connection.query('INSERT INTO users SET ?',user, func);
	}

	return this;
};

module.exports = db;