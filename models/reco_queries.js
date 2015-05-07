
// function connect(databaseUrl){
	
// 	var db = new Db('yelp', new Server('localhost', 27017));
// 	collections = ["rest_sim", "books_sim", "bars_sim", "shopping_sim", "gym_sim","buisness_meta",]
// 	var db = require("mongojs").connect(databaseUrl, collections);
// 	return db;
// }

// function findSimilarItems(db, category, item){
// 	var collection = getCollection(db , category);
// 	collection.find({key: item.key} , function(err, items){
// 		if(err){
// 			console.log("err in finding similar items : " + err)
// 		}else{
// 			items.sort(function(item1 , item2){return item1.value[1] - item2.value[1]})
// 			return items;
// 		}
// 	})
// 	collection.close();
// }

// function getMetaInfo(item){
// 	var collection = getCollection(db, 'buisness_meta');
// 	var itemid = item.key;
// 	collection.find({key: itemid} , function(err, items){
// 		if(err){
// 			console.log("err in finding similar items : " + err)
// 		}else{
// 			return item[0];
// 		}
// 	})
// 	collection.close();
// }

// function locationFilter(currentlocation, similar_items){
// 	var distance_th; //initialize to some value
// 	var close_buisnesses = [];
	
// 	for(var i=0;i<similar_items.length;i++){
// 		var buisness = getMetaInfo(similar_items[i]);
// 		if(){ // condition yet to write
// 			close_buisnesses.push(buisness);
// 		}
// 	}
// 	return close_buisnesses;
// }


// function timeFilter(similar_items){
// 	var currentOpen = [];
// 	var currentitem_meta = getMetaInfo(currentitem);
// 	for(var i=0;i<similar_items.length;i++){
// 		var buisness = getMetaInfo(similar_items[i]);
// 		if(timeCompare(buisness)){
// 			currentOpen.push(buisness);
// 		}
// 	}
// 	return currentOpen;
// }

// var days = {};
// days["1"] = "Monday";
// days["2"] = "Tuesday";
// days["3"] = "Wednesday";
// days["4"] = "Thrusday";
// days["5"] = "Friday";
// days["6"] = "Saturday";
// days["7"] = "Sunday";

// function timeCompare(item){
// 	var d = new Date();
// 	 var day = new d.getDay();
// 	 var workingHours = item.hours[days[day]].split("-");
// 	 var opening = workingHours[0].split(":");
// 	 opening = parseInt(opening[0]);

// 	 var closing = workingHours[1].split(":");
// 	 closing = parseInt(closing[0]);

// 	 var hour = d.getHours();
// 	 if(hour => opening && hour < closing){
// 	 	return true;
// 	 }else{
// 	 	return false;
// 	 }


// }


// function budgetFilter(similar_items, budgetPreference){
// 	var affordable = []
// 	for(var i=0;i<similar_items.length;i++){
// 		var buisness = getMetaInfo(similar_items[i]);
// 		if(budgetPreference <= buisness.budget){
// 			affordable.push(buisness);
// 		}
// 	}
// 	return affordable;


// }
// function getCollection(db, category){
// 	if(category == 'restaurant'){
// 		return db.rest_sim
// 	}else if(category == 'books'){
// 		return db.books_sim
// 	}else if(category == 'shopping'){
// 		return db.shopping_sim
// 	}else if(category == 'gym'){
// 		return db.gym_sim
// 	}else if(category == 'bars'){
// 		return db.bars_sim
// 	}else if(category == 'buisness_meta'){
// 		return db.buisness_meta
// 	}
// }