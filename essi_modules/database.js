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
	this.fetch_car_only = function fetch_car(car, func){
		connection.query("SELECT * FROM car WHERE ?", car, func);
	}



	this.add_service_info = function add_service_info(service_info, func){
		connection.query('INSERT INTO service_info SET ?', service_info, func);
	}
	this.add_service_user = function add_service_user(service_user, func){
		connection.query('INSERT INTO service_user SET ?', service_user, func);
	}
	this.add_service_car = function add_service_car(service_car, func){
		connection.query('INSERT INTO service_car SET ?', service_car, func);
	}

	this.fetch_service_info = function fetch_service_info(service_info, func){
		connection.query("SELECT * FROM service_info WHERE ?", service_info, func);
	}
	this.fetch_service_user = function fetch_service_info(service_user, func){
		var query_str;
		var info;
		if(service_user.user_id != undefined){
			if(service_user.user_type != undefined){
				query_str = "SELECT * FROM service_user WHERE service_id = ? AND user_id = ? AND user_type = ?";
				info = [service_user.service_id, service_user.user_id, service_user.user_type];
			}else{
				query_str = "SELECT * FROM service_user WHERE service_id = ? AND user_id = ?";
				info = [service_user.service_id, service_user.user_id];
			}
		}else{
			if(service_user.user_type != undefined){
				query_str = "SELECT * FROM service_user WHERE service_id = ? AND user_type = ?";
				info = [service_user.service_id, service_user.user_type];
			}else{
				query_str = "SELECT * FROM service_user WHERE service_id = ?";
				info = [service_user.service_id];
			}
		}
		if(	service_user.service_id == undefined &&
		 	 service_user.user_type == undefined &&
		  	   service_user.user_id != undefined){
			query_str = "SELECT * FROM service_user WHERE user_id = ?";
			info = [service_user.user_id];
		}
		connection.query(query_str, info, func);
	}
	this.fetch_service_car = function fetch_service_car(service_car, func){
		var query_str;
		var info;
		if(service_car.car_id != undefined){
			query_str = "SELECT * FROM service_car WHERE service_id = ? AND car_id = ?";
			info = [service_car.service_id, service_car.car_id];
		}else{
			query_str = "SELECT * FROM service_car WHERE service_id = ?";
			info = [service_car.service_id];
		}
		connection.query(query_str, info, func);
	}



	this.add_modification = function add_modification(modification, func){
		connection.query('INSERT INTO modification SET ?', modification, func);
	}
	this.add_modification_info = function add_modification_info(modification_info, func){
		connection.query('INSERT INTO modification_info SET ?', modification_info, func);
	}

	this.fetch_modification = function fetch_modification(modification, func){
		connection.query("	SELECT * FROM modification \
							JOIN modification_info ON \
							modification.id = modification_info.modification_id \
							WHERE ?", modification, func);
	}

	return this;
};

module.exports = db;