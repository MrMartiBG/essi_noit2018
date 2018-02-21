var db_conf = {};

db_conf.configure = function(connection){
	console.log("configure");
	var sql = "CREATE TABLE IF NOT EXISTS `users` (`id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,`created` datetime NOT NULL,`modified` datetime NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"
	connection.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("Table created");
	  });
	// TODO:
	// Create table if not exists...
	// Creating tables if they don't exists
};

module.exports = db_conf;