var db_conf  = function(mysql,db_user){

	console.log("configure");

	var connection = mysql.createConnection(db_user)
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected to DB!");
	});

	var sql_table_users = "	CREATE TABLE IF NOT EXISTS `users` ( \
							`id` int NOT NULL AUTO_INCREMENT, \
							`user_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL UNIQUE, \
							`password` varchar(256) COLLATE utf8_unicode_ci NOT NULL, \
							`email` varchar(128) COLLATE utf8_unicode_ci NOT NULL UNIQUE, \
							`created` datetime NOT NULL, \
							`modified` datetime NOT NULL, \
							PRIMARY KEY (`id`) \
						) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
	connection.query(sql_table_users, function (err, result) {
	    if (err) throw err;
	    console.log("Table `users` done!");
	 });

	return connection;
};

module.exports = db_conf;

