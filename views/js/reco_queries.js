
function locationFilter( similar_items){
	var distance_th; //initialize to some value
	var close_buisnesses = [];
	
	var longi = 37.3353;
	var lat = 121.8813; 

	for(var i=0;i<similar_items.length;i++){
		var longitude = similar_items[i].longitude;
		var lattitude = similar_items[i].latitude;
		var distance = Math.sqrt(Math.pow((longitude - longi), 2) + Math.pow((latitude - lat)));
		if(distance < 10){ // condition yet to write
			close_buisnesses.push(similar_items[i]);
			
		}
	}
	return close_buisnesses;
}


function timeFilter(similar_items){
	var currentOpen = [];
	var currentitem_meta = getMetaInfo(currentitem);
	for(var i=0;i<similar_items.length;i++){
		var buisness = getMetaInfo(similar_items[i]);
		if(timeCompare(buisness)){
			currentOpen.push(buisness);
		}
	}
	return currentOpen;
}

var days = {};
days["1"] = "Monday";
days["2"] = "Tuesday";
days["3"] = "Wednesday";
days["4"] = "Thrusday";
days["5"] = "Friday";
days["6"] = "Saturday";
days["7"] = "Sunday";

function timeCompare(item){
	 var d = new Date();
	 var day = new d.getDay();
	 var workingHours = item.hours[days[day]].split("-");
	 var opening = workingHours[0].split(":");
	 opening = parseInt(opening[0]);

	 var closing = workingHours[1].split(":");
	 closing = parseInt(closing[0]);

	 var hour = d.getHours();
	 if(hour => opening && hour < closing){
	 	return true;
	 }else{
	 	return false;
	 }


}


function budgetFilter(similar_items, budgetPreference){
	var affordable = []
	for(var i=0;i<similar_items.length;i++){
		var buisness = getMetaInfo(similar_items[i]);
		if(budgetPreference <= buisness.budget){
			affordable.push(buisness);
		}
	}
	return affordable;
}

function getCollection(db, category){
	if(category == 'restaurant'){
		return db.rest_sim
	}else if(category == 'books'){
		return db.books_sim
	}else if(category == 'shopping'){
		return db.shopping_sim
	}else if(category == 'gym'){
		return db.gym_sim
	}else if(category == 'bars'){
		return db.bars_sim
	}else if(category == 'buisness_meta'){
		return db.buisness_meta
	}
}