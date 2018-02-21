var db  = function(connection){
	this.register = function register(user){
		connection.query('INSERT INTO users SET ?',user, function (err, results) {
			if (err){
				console.log("err adding user");
				console.log("err", err);
				console.log('results', results);
				return false;
			}
			console.log("succ adding user");
			console.log("err", err);
			console.log('results', results);
			return true;
		});
	}

	return this;
};

module.exports = db;