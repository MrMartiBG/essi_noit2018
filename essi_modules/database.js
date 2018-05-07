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

	// this.connection.query("INSERT INTO service_car SET ?", {account_service_id: 2, car_id: 2}, function(){});

	this.add_account = function add_account(account, func){
		this.connection.query("INSERT INTO account SET ?", account, func);
	}
	this.get_account = function get_account(account, func){
		this.connection.query("SELECT * FROM account WHERE ?", account, func);
	}
	this.set_accout_password = function set_accout_password(set, where, func){
		this.connection.query("UPDATE account SET ? WHERE ?", [set, where], func);
	}
	this.delete_account = function delete_account(account, func){
		this.connection.query("DELETE FROM account WHERE ?", account, func);
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
	this.set_user_data = function set_user_data(set, where, func){
		this.connection.query("UPDATE user SET ? WHERE ?", [set, where], func);
	}



	this.add_car = function add_car(car, func){
		this.connection.query("INSERT INTO car SET ?", car, func);
	}
	this.get_car = function get_car(car, func){
		this.connection.query("SELECT * FROM car WHERE ?", car, func);
	}
	this.set_car = function add_car(new_car, car, user, func){
		this.connection.query("UPDATE car JOIN user_car ON car.id = user_car.car_id SET ? WHERE ? AND ?", [new_car, car, user], func);
	}
	this.add_user_car = function add_user_car(user_car, func){
		this.connection.query("INSERT INTO user_car SET ?", user_car, func);
	}
	this.get_user_cars = function get_user_cars(user, func){
		this.connection.query("SELECT * FROM user_car JOIN car ON car.id = user_car.car_id WHERE ?", user, func);
	}
	this.get_user_car = function get_user_car(user, car, func){
		this.connection.query("SELECT * FROM user_car WHERE ? AND ?", [user, car], func);
	}
	this.delete_car = function delete_car(car, func){
		this.connection.query("DELETE FROM car WHERE ?", car, func);
	}
	this.delete_user_car = function delete_user_car(car, user, func){
		this.connection.query("DELETE car, user_car FROM user_car JOIN car ON car.id = user_car.car_id WHERE ? AND ?", [car, user], func);
	}



	this.add_modification = function add_modification(modification, func){
		this.connection.query("INSERT INTO modification SET ?", modification, func);
	}
	this.get_modifications = function get_modifications(user, func){
		this.connection.query("SELECT * FROM modification JOIN user_car ON modification.car_id = user_car.car_id WHERE ?", user, func);
	}



	this.add_notification = function add_notification(notification, func){
		this.connection.query("INSERT INTO notification SET ?", notification, func);
	}
	this.get_notifications = function get_notifications(notification, func){
		this.connection.query("SELECT * FROM notification WHERE ?", notification, func);
	}
	this.get_user_car_modification = function get_user_car_modification(user, mod, func){
		this.connection.query("SELECT * FROM modification JOIN user_car ON modification.car_id = user_car.car_id WHERE ? AND ?",
																											 [user, mod], func);
	}



	this.get_service_data = function get_service_data(service, func){
		this.connection.query("SELECT * FROM service WHERE ?", service, func);
	}
	this.set_service_data = function set_service_data(set, where, func){
		this.connection.query("UPDATE service SET ? WHERE ?", [set, where], func);
	}

	this.add_service_user = function add_service_user(service_user, func){
		this.connection.query("INSERT INTO service_user SET ?", service_user, func);
	}
	this.get_service_user = function get_service_user(service_user, func){
		this.connection.query("SELECT * FROM service_user WHERE ?", service_user, func);
	}
	this.set_service_user = function set_service_user(rights, service, user, func){
		this.connection.query("UPDATE service_user SET ? WHERE ? AND ?", [rights, service, user], func);
	}
	this.delete_service_user = function delete_service_user(service, user, func){
		this.connection.query("DELETE FROM service_user WHERE ? AND ?", [service, user], func);
	}



	this.get_service_user_rights = function get_service_user_rights(service, user, func){
		this.connection.query("SELECT user_rights FROM service_user WHERE ? AND ?", [service, user], func);
	}



	this.get_user_car_by_worker = function get_user_car_by_worker(car, func){
		this.connection.query("SELECT * FROM user_car WHERE ?", car, func);
	}
	this.delete_service_car_by_worker = function delete_service_car_by_worker(car, service, func){
		this.connection.query("DELETE FROM service_car WHERE ? AND ?", [car, service], func);
	}
	this.get_cars_by_worker = function get_cars_by_worker(service, func){
		this.connection.query("SELECT * FROM service_car JOIN car ON car.id = service_car.car_id WHERE ?", service, func);
	}

	this.get_service_car_by_worker = function get_service_car_by_worker(car, service, func){
		this.connection.query("SELECT * FROM service_car WHERE ? AND ?", [car, service], func);
	}


	this.get_modifications_by_worker = function get_modifications_by_worker(car, func){
		this.connection.query("SELECT * FROM modification WHERE ?", car, func);
	}
	this.add_modification_by_worker = function add_modification_by_worker(modification, func){
		this.connection.query("INSERT INTO modification SET ?", modification, func);
	}
	this.set_modification_by_worker = function set_modification_by_worker(set, where, func){
		this.connection.query("UPDATE modification SET ? WHERE ?", [set, where], func);
	}
	return this;
};
