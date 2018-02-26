var db  = function(connection){
	this.register_user = function register_user(user, func){
		connection.query('INSERT INTO users SET ?',user, func);
	}

	this.fetch_user = function fetch_user(user_name, func){
		connection.query("SELECT * FROM users WHERE user_name = '" + user_name + "'", func);
	}

	this.register_car = function register_car(car, func){
		connection.query('INSERT INTO cars SET ?',car, func);
	}

	this.fetch_cars = function fetch_cars(owner, func){
		connection.query("SELECT * FROM cars WHERE owner = '" + owner + "'", func);
	}

	this.register_modification = function register_modification(modification, func){
		connection.query('INSERT INTO modifications SET ?',modification, func);
	}

	this.fetch_modifications = function fetch_modifications(car_id, func){
		connection.query("SELECT * FROM modifications WHERE car_id = '" + car_id + "'", func);
	}

	return this;
};

module.exports = db;