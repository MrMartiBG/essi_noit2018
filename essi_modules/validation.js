module.exports = function(mysql,db_user){

	this = {};

		this.user_car_owner(user, car, func){
			if(car.owner_id == user.id) return true;
			return false;
		}
		this.user_service_user_in(user, service_user, func){
			for(var i = 0; i < servce_user.length; i++){
				if(servce_user[i].user_id == user.id){
					return true;
				}
			}
			return false;
		}
		this.user_service_user_owner(user, servce_user, func){
				for(var i = 0; i < servce_user.length; i++){
					if(servce_user[i].user_id == user.id && service_user[i].user_type == "owner"){
						return true;
					}
				}
				return false;
		}
		this.service_car_service_user_in(service_car, servce_user, func){
			for(var i = 0; i < servce_user.length; i++){
				for(var x = 0; x < servce_car.length; x++){
					if(service_user[i].service_id == servce_car[x].service_id){
						return true;
					}
				}
			}
			return false;
		}

	return this;
};
