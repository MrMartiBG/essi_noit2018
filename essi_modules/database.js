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

	return this;
};
