module.exports = function(database){

	this.handler = function handler(socket){
		console.log('user connected', socket.id);
		socket.authenticated = false;

		require('./authentication.js')(socket, database);
		require('./car.js')(socket, database);
		require('./service.js')(socket, database);

		socket.on("new-message", function(msg){
			console.log("new-message", msg);
		});

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	}

	return this;
}