var db_conf  = function(mysql,db_user){

	console.log("configure");

	var connection = mysql.createConnection(db_user)
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected to DATABASE!");
	});

	// table user
	var sql_table_user = "	CREATE TABLE IF NOT EXISTS `user` (								\
							`id` 			int 			NOT NULL 	AUTO_INCREMENT,		\
							`username` 		varchar(64) 	NOT NULL 	UNIQUE,				\
							`password` 		varchar(256)	NOT NULL,						\
							`email` 		varchar(64) 	NOT NULL 	UNIQUE,				\
							`firstname` 	varchar(64) 	NOT NULL,						\
							`lastname` 		varchar(64) 	NOT NULL, 						\
							`mobile` 		varchar(64) 									\
							PRIMARY KEY (`id`) 												\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

	// table car
	var sql_table_car = "	CREATE TABLE IF NOT EXISTS `car` ( 								\
							`id` 			int 			NOT NULL 	AUTO_INCREMENT, 	\
							`owner_id` 		int 			NOT NULL, 						\
							`public` 		bool 						DEFAULT false, 		\
							`brand` 		varchar(64)  	NOT NULL, 						\
							`model` 		varchar(64)  	NOT NULL, 						\
							`generation` 	varchar(64)  	NOT NULL, 						\
							`engine` 		varchar(64)  	NOT NULL, 						\
							`vin_number` 	varchar(64)  	NOT NULL 	UNIQUE				\
							PRIMARY KEY (`id`) 												\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

	// table service_info
	var sql_table_service_info = "	CREATE TABLE IF NOT EXISTS `service_info` ( 			\
							`id` 			int 			NOT NULL 	AUTO_INCREMENT, 	\
							`name` 			varchar(64) 	NOT NULL, 						\
							`address` 		varchar(64) 	NOT NULL, 						\
							`email` 		varchar(64) 	NOT NULL 	UNIQUE, 			\
							`mobile` 		varchar(64) 	NOT NULL, 						\
							PRIMARY KEY (`id`) 												\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

	// table service_user
	var sql_table_service_user = "	CREATE TABLE IF NOT EXISTS `service_user` ( 			\
							`service_id` 	int 			NOT NULL, 						\
							`user_id` 		int 			NOT NULL, 						\
							`user_type` 	varchar(64) 	NOT NULL 						\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

	// table service_car
	var sql_table_service_car = "	CREATE TABLE IF NOT EXISTS `service_car` ( 				\
							`service_id` 	int 			NOT NULL, 						\
							`car_id` 		int 			NOT NULL						\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

	// table modification
	var sql_table_modification = "	CREATE TABLE IF NOT EXISTS `modification` ( 			\
							`id` 			int 			NOT NULL AUTO_INCREMENT, 		\
							`car_id` 		int 			NOT NULL, 						\
							`service_id` 	int 			NOT NULL, 						\
							`status` 		varchar(64), 									\
							`mileage` 		int(64) 		NOT NULL, 						\
							`date` 			datetime		NOT NULL, 						\
							`type` 			varchar(64) 	NOT NULL, 						\
							`part` 			varchar(64) 	NOT NULL, 						\
							`description` 	varchar(256) 	NOT NULL 						\
							PRIMARY KEY (`id`)			 									\
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"					;

			

	connection.query(sql_table_user, function (err, result) {
	    if (err) throw err;
	    console.log("Table `user` done!");
	 });
	connection.query(sql_table_car, function (err, result) {
	    if (err) throw err;
	    console.log("Table `car` done!");
	 });
	connection.query(sql_table_service_info, function (err, result) {
	    if (err) throw err;
	    console.log("Table `service_info` done!");
	 });
	connection.query(sql_table_service_user, function (err, result) {
	    if (err) throw err;
	    console.log("Table `service_user` done!");
	 });
	connection.query(sql_table_service_car, function (err, result) {
	    if (err) throw err;
	    console.log("Table `service_car` done!");
	 });			
	connection.query(sql_table_modification, function (err, result) {
	    if (err) throw err;
	    console.log("Table `modification` done!");
	 });



	return connection;
};

module.exports = db_conf;
