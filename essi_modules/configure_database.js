var db_conf  = function(mysql,db_user){

	console.log("configure");

	var connection = mysql.createConnection(db_user)
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected to DB!");
	});

	// table user
	var sql_table_user = "	CREATE TABLE IF NOT EXISTS `user` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`username` varchar(64) NOT NULL UNIQUE, \
							`password` varchar(256)  NOT NULL, \
							`email` varchar(64) NOT NULL UNIQUE, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_user, function (err, result) {
	    if (err) throw err;
	    console.log("Table `user` done!");
	 });

	// table user_info
	var sql_table_user_info = "	CREATE TABLE IF NOT EXISTS `user_info` ( \
							`user_id` int NOT NULL UNIQUE, \
							`firstname` varchar(64) NOT NULL, \
							`lastname` varchar(64) NOT NULL, \
							`mobile` varchar(64) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_user_info, function (err, result) {
	    if (err) throw err;
	    console.log("Table `user_info` done!");
	 });

	// table car
	var sql_table_car = "	CREATE TABLE IF NOT EXISTS `car` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`owner_id` int NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_car, function (err, result) {
	    if (err) throw err;
	    console.log("Table `car` done!");
	 });

	// table car_info
	var sql_table_car_info = "	CREATE TABLE IF NOT EXISTS `car_info` ( \
							`car_id` int NOT NULL UNIQUE, \
							`brand` varchar(64)  NOT NULL, \
							`model` varchar(64)  NOT NULL, \
							`generation` varchar(64)  NOT NULL, \
							`engine` varchar(64)  NOT NULL, \
							`vin_number` varchar(64)  NOT NULL \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_car_info, function (err, result) {
	    if (err) throw err;
	    console.log("Table `car_info` done!");
	 });

	// table service_info
	var sql_table_service_info = "	CREATE TABLE IF NOT EXISTS `service_info` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`name` varchar(64) NOT NULL, \
							`address` varchar(64) NOT NULL, \
							`email` varchar(64) NOT NULL UNIQUE, \
							`mobile` varchar(64) NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_service_info, function (err, result) {
	    if (err) throw err;
	    console.log("Table `service_info` done!");
	 });

	// table service_user
	var sql_table_service_user = "	CREATE TABLE IF NOT EXISTS `service_user` ( \
							`service_id` int NOT NULL, \
							`user_id` int NOT NULL, \
							`user_type` varchar(64) NOT NULL \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_service_user, function (err, result) {
	    if (err) throw err;
	    console.log("Table `service_user` done!");
	 });

	// table modification
	var sql_table_modification = "	CREATE TABLE IF NOT EXISTS `modification` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`car_id` int NOT NULL, \
							`service_id` int NOT NULL, \
							`status` varchar(64), \
							`mileage` int(64) NOT NULL, \
							`date` datetime NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_modification, function (err, result) {
	    if (err) throw err;
	    console.log("Table `modification` done!");
	 });

	// table modification_info
	var sql_table_modification_info = "	CREATE TABLE IF NOT EXISTS `modification_info` ( \
							`modification_id` int NOT NULL UNIQUE, \
							`type` varchar(64) NOT NULL, \
							`part` varchar(64) NOT NULL, \
							`description` varchar(256) NOT NULL \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_modification_info, function (err, result) {
	    if (err) throw err;
	    console.log("Table `modification_info` done!");
	 });



	return connection;
};

module.exports = db_conf;

