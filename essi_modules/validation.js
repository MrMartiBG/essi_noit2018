module.exports = function(){

		this.car_public = function(car){
			return car.public;
		}
		this.user_car_owner = function(user, car){
			if(car.owner_id == user.id) return true;
			return false;
		}
		this.user_service_user_in = function(user, service_user){
			for(var i = 0; i < service_user.length; i++){
				if(service_user[i].user_id == user.id){
					return true;
				}
			}
			return false;
		}
		this.user_service_user_owner = function(user, service_user){
			console.log(user, service_user);
			for(var i = 0; i < service_user.length; i++){
				if(service_user[i].user_id == user.id && service_user[i].user_type == "owner"){
					return true;
				}
			}
			return false;
		}
		this.service_car_service_user_in = function(service_car, service_user){
			for(var i = 0; i < service_user.length; i++){
				for(var x = 0; x < service_car.length; x++){
					if(service_user[i].service_id == service_car[x].service_id){
						return true;
					}
				}
			}
			return false;
		}

	return this;
};
