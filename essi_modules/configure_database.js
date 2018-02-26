var db_conf  = function(mysql,db_user){

	console.log("configure");

	var connection = mysql.createConnection(db_user)
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected to DB!");
	});

	var sql_table_users = "	CREATE TABLE IF NOT EXISTS `users` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`username` varchar(64) COLLATE utf8_unicode_ci NOT NULL UNIQUE, \
							`password` varchar(256) COLLATE utf8_unicode_ci NOT NULL, \
							`email` varchar(128) COLLATE utf8_unicode_ci NOT NULL UNIQUE, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_users, function (err, result) {
	    if (err) throw err;
	    console.log("Table `users` done!");
	 });

	var sql_table_cars = "	CREATE TABLE IF NOT EXISTS `cars` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`owner` varchar(64) COLLATE utf8_unicode_ci NOT NULL, \
							`year` int(4) UNSIGNED NOT NULL, \
							`manufacturer` varchar(64) COLLATE utf8_unicode_ci NOT NULL, \
							`model` varchar(64) COLLATE utf8_unicode_ci NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_cars, function (err, result) {
	    if (err) throw err;
	    console.log("Table `cars` done!");
	 });

	var sql_table_modifications = "	CREATE TABLE IF NOT EXISTS `modifications` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`car_id` int NOT NULL, \
							`date` datetime NOT NULL, \
							`type` varchar(64) COLLATE utf8_unicode_ci NOT NULL, \
							`description` varchar(256) COLLATE utf8_unicode_ci NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_modifications, function (err, result) {
	    if (err) throw err;
	    console.log("Table `modifications` done!");
	 });

	return connection;
};

module.exports = db_conf;

