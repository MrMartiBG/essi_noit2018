var db  = function(connection){

	this.register_user = function register_user(user, func){
		connection.query('INSERT INTO user SET ?', user, func);
	}
	this.add_user_info = function add_user_info(user_info, func){
		connection.query('INSERT INTO user_info SET ?', user_info, func);
	}

	this.fetch_user = function fetch_user(user, func){
		connection.query("SELECT * FROM user JOIN user_info ON user.id = user_info.user_id WHERE ?", user, func);
	}



	this.add_car = function add_car(car, func){
		connection.query('INSERT INTO car SET ?', car, func);
	}
	this.add_car_info = function add_car_info(car_info, func){
		connection.query('INSERT INTO car_info SET ?', car_info, func);
	}

	this.fetch_car = function fetch_car(car, func){
		connection.query("SELECT * FROM car JOIN car_info ON car.id = car_info.car_id WHERE ?", car, func);
	}



	this.add_service_info = function add_service_info(service_info, func){
		connection.query('INSERT INTO service_info SET ?', service_info, func);
	}
	this.add_service_user = function add_service_user(service_user, func){
		connection.query('INSERT INTO service_user SET ?', service_user, func);
	}

	this.fetch_service_info = function fetch_service_info(service_info, func){
		connection.query("SELECT * FROM service_info WHERE ?", service_info, func);
	}

	return this;
};

module.exports = db;