var db  = function(connection){
	this.register = function register(user){
		connection.query('INSERT INTO users SET ?',user, function (err, results) {
			if (err) throw err;
			console.log('User added', results);
		});
	}

	return this;
};

module.exports = db;