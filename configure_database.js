var      mysql = require('mysql');
var    db_user = require('./config/database_user.js');

console.log("Config database...");

var connection = mysql.createConnection(db_user);
connection.connect(function(err) {

	if (err){
		console.log("Error: ",	err.code);
		process.exit(1);
	}
	console.log("Connected to mysql!");

	connection.query("CREATE DATABASE essi", function (err, result) {
		if (err){
			console.log("Error: ",	err.code);
			process.exit(1);
		}
		console.log("Database `essi` created!");

		connection.end();

		db_user.database = "essi";
		db_user.multipleStatements = true;

		connection = mysql.createConnection(db_user);
		connection.connect(function(err) {
			if (err){
				console.log("Error: ",	err.code);
				process.exit(1);
			}
			console.log("Connected to database!");
			config_tables();

		});
	});
});


function config_tables(){

	var account = "		CREATE TABLE `account` (											\
							`id`			int 			NOT NULL 	AUTO_INCREMENT		,\
							`email` 		varchar(64) 	NOT NULL 	UNIQUE				,\
							`password` 		varchar(256)	NOT NULL						,\
							`type` 			varchar(64) 	NOT NULL 						,\
							PRIMARY KEY (`id`) 												\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;


	var user = "		CREATE TABLE `user` (												\
							`account_id`	int 			NOT NULL 	UNIQUE				,\
							`first_name` 	varchar(64) 	NOT NULL						,\
							`last_name` 	varchar(64) 	NOT NULL						,\
							`picture` 		varchar(256)				UNIQUE				,\
							`phone` 		varchar(64)  									,\
							`birthdate` 	datetime										,\
							`country` 		varchar(64) 									,\
							`city` 			varchar(64) 									,\
							`info` 			varchar(256) 									\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var service = "		CREATE TABLE `service` (											\
							`account_id`	int 			NOT NULL 	UNIQUE				,\
							`name` 			varchar(64) 	NOT NULL 	UNIQUE				,\
							`country` 		varchar(64) 									,\
							`city` 			varchar(64) 									,\
							`address` 		varchar(64)			 							,\
							`contact_info` 	varchar(256)									,\
							`info`	 		varchar(256) 									\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var car = "			CREATE TABLE `car` (												\
							`id` 			int 			NOT NULL 	AUTO_INCREMENT, 	\
							`picture` 		varchar(256)				UNIQUE				,\
							`make` 			varchar(64) 									,\
							`model` 		varchar(64) 									,\
							`generation` 	varchar(64) 									,\
							`engine` 		varchar(64) 									,\
							`status` 		varchar(64) 									,\
							`vin_number` 	varchar(64)					UNIQUE				,\
							`registration_number`	varchar(64)			UNIQUE				,\
							`public` 		bool 			NOT NULL	DEFAULT false 		,\
							PRIMARY KEY (`id`) 												\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var modification = "CREATE TABLE `modification` (										\
							`id` 			int 			NOT NULL 	AUTO_INCREMENT 		,\
							`car_id` 		int 			NOT NULL 						,\
							`worker_id` 	int 			 								,\
							`service_id` 	int 											,\
							`type` 			varchar(64) 	NOT NULL 						,\
							`date` 			datetime		NOT NULL 						,\
							`mileage` 		int(64) 		NOT NULL 						,\
							`zone` 			varchar(64) 	NOT NULL 						,\
							`part` 			varchar(64) 	NOT NULL 						,\
							`part_make` 	varchar(64) 									,\
							`info` 			varchar(64) 									,\
							PRIMARY KEY (`id`)			 									\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var notification = "CREATE TABLE `notification` (										\
							`id` 			  int 			NOT NULL 	AUTO_INCREMENT		,\
							`to_account_id`   int 			NOT NULL 						,\
							`from_account_id` int 			NOT NULL 						,\
							`status` 		  varchar(64) 	NOT NULL 						,\
							`type` 			  varchar(64) 	NOT NULL 						,\
							`date` 			  datetime		NOT NULL 						,\
							PRIMARY KEY (`id`)			 									\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var user_car = "	CREATE TABLE `user_car` (											\
							`account_user_id`	 int 		NOT NULL 	UNIQUE				,\
							`account_service_id` int 		NOT NULL 	UNIQUE				\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var service_car = "	CREATE TABLE `service_car` (										\
							`account_service_id`  int 		NOT NULL 	UNIQUE				,\
							`car_id`	 		  int 		NOT NULL 	UNIQUE				\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;



	var service_user = "CREATE TABLE `service_user` (										\
							`account_user_id`	  int 		NOT NULL 	UNIQUE				,\
							`account_service_id`  int 		NOT NULL 	UNIQUE				,\
							`user_rights`	 	  int 		NOT NULL						\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;


	var logs = "		CREATE TABLE `logs` (												\
							`id` 			  	int 			NOT NULL 	AUTO_INCREMENT	,\
							`account_service_id`int 			NOT NULL 					,\
							`user_account_id`   int 			NOT NULL 					,\
							`car_id`   			int 										,\
							`modification_id`   int 										,\
							`notification_id`   int 										,\
							`date` 			  	datetime		NOT NULL 					,\
							PRIMARY KEY (`id`)			 									\
					) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"						;


	connection.query(	account + 
						user + 
						service + 
						car + 
						modification + 
						notification + 
						user_car + 
						service_car + 
						service_user + 
						logs,
	function (err, result) {
		if (err){
			console.log("Error: ",	err.code);
			process.exit(1);
		}
    	console.log("Tables created!");
		connection.end();
	});
}
