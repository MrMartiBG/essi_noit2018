var db  = function(mysql,db_user){

	db_user.database = "essi";
	this.connection = mysql.createConnection(db_user);
	this.connection.connect(function(err) {
		if (err){
			console.log("Error: ",	err.code);
			process.exit(1);
		}
		console.log("Connected to database!");
	});



	this.register_user = function register_user(user, func){
		this.connection.query('INSERT INTO user SET ?', user, func);
	}
	this.fetch_user = function fetch_user(user, func){
		this.connection.query("SELECT * FROM user WHERE ?", user, func);
	}



	this.add_car = function add_car(car, func){
		this.connection.query('INSERT INTO car SET ?', car, func);
	}
	this.fetch_car = function fetch_car(car, func){
		this.connection.query("SELECT * FROM car WHERE ?", car, func);
	}


	this.add_service = function add_service(service_info, func){
		this.connection.query('INSERT INTO service_info SET ?', service_info, func);
	}
	this.fetch_service = function fetch_service(service_info, func){
		this.connection.query('SELECT * FROM service_info WHERE ?', service_info, func);
	}
	this.add_service_user = function add_service_user(service_user, func){
		this.connection.query('INSERT INTO service_user SET ?', service_user, func);
	}
	this.fetch_service_user = function fetch_service_user(service_user, func){
		this.connection.query('SELECT * FROM service_user WHERE ?', service_user, func);
	}
	this.add_service_car = function add_service_car(service_car, func){
		this.connection.query('INSERT INTO service_car SET ?', service_car, func);
	}
	this.fetch_service_car = function fetch_service_car(service_car, func){
		this.connection.query('SELECT * FROM service_car WHERE ?', service_car, func);
	}


	// this.add_modification = function add_modification(modification, func){
	// 	this.connection.query('INSERT INTO modification SET ?', modification, func);
	// }
	// this.add_modification_info = function add_modification_info(modification_info, func){
	// 	this.connection.query('INSERT INTO modification_info SET ?', modification_info, func);
	// }
	//
	// this.fetch_modification = function fetch_modification(modification, func){
	// 	this.connection.query("	SELECT * FROM modification \
	// 						JOIN modification_info ON \
	// 						modification.id = modification_info.modification_id \
	// 						WHERE ?", modification, func);
	// }

	return this;
};

module.exports = db;
