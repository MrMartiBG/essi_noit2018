module.exports = function(database){

	this.handler = function handler(socket){
		console.log('user connected', socket.id);

		socket.on("new-message", function(msg){
			console.log("new-message", msg);
		});

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});


		socket.fail = function fail(func_name, info){
			socket.emit(func_name + '_fail', info);
			console.log(func_name + '_fail', info);
			return info;
		}
		socket.successful = function successful(func_name, results){
			socket.emit(func_name + '_successful',results);
			console.log(func_name + '_successful',results);
			return results;
		}
			

		socket.authenticated = false;

		require('./authentication.js')	(socket, database);
		require('./car.js')				(socket, database);
		require('./service.js')			(socket, database);
		require('./modification.js')	(socket, database);

	}

	return this;
}