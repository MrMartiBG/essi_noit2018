var db  = function(connection){
	this.register = function register(user){
		connection.query('INSERT INTO users SET ?',users, function (err, results) {
			if (err) throw err;
			console.log('User added', results);
		});
	}
};

module.exports = db;