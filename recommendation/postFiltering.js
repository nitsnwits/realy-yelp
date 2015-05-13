var env = require("../config/environment")
	, apiController = require('../controllers/apiController')
 	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, apiModel = require('../models/apiModel')
	, geolib = require('geolib');

	var buffer=null;

module.exports.generateFinalReco = function(output_string,callback){

			console.log("output_string" + output_string);
			parseResponse(output_string,function(businesses){
				buffer = output_string;
				getBusinessFromIds(businesses,function(results){
					// console.log("meta info is "+results);
								postfilter(results,function(postfiltered){
									console.log("postfiltered");
									callback(postfiltered);
								})
					            //var locationFiltered = locationFilter(results);
					           // var timeFilterred = timefilter(locationFiltered);
					           //console.log("came herew");
					           //console.log(locationFiltered);
					            
					           // return timeFilterred;
				})
	         });
	}


function getBusinessFromIds(business_id,callback) {
	
	var businesses = business_id.split(',');
	var responseArray = [];
	function findBusinessFromId(businessId, cb) {
		apiModel.dbGetBusiness(businessId, function(err, business) {
			if (err) {
				logger.log('Error from database: ' + error);
				cb(err);
			}
			if(!validator.isNull(business)) {
				responseArray.push(business);
			}
			cb(null, business);
		});
	}
	async.each(businesses, findBusinessFromId, function(err) {
		if (err) {
			callback(null);
		}
		callback(responseArray);
	});
}

	

	function parseResponse(data,callback){
		
		var businesses="";

		
		for(var i = 0 ; i < 50 ; i++){
			//console.log(JSON.stringify(data[i]));
		//	var nirav = data[i];
			//var json = JSON.parse(data[i]);
			//console.log("key --------"+json["key"]);
			//console.log(Object.keys(data[i]));
		//	console.log(JSON.stringify(data[i]['_doc']['val'][0]));
			//console.log("ddfsfasa---"+ JSON.stringify(data[i]['val']));
		//	console.log(JSON.parse(data[i][0]));
			//console.log(nirav.val[0]);
			//businesses+=data[i].val[0]+",";
			businesses+=data[i]['_doc']['val'][0]+",";
		}

		/*for(var elemetns in data){
			for(var row in elemetns){
				businesses+=row[row].val[0]+",";	
			}
			
		}*/
		businesses = businesses.substring(0,businesses.length-1);
	    //console.log(businesses)
		callback(businesses); 
 	}

 	function postfilter(prefilteredData,callback){
 		var postFilteredData = locationFilter(prefilteredData,function(locationFiltered){
 			timefilter(locationFiltered,function(timeFilterred){
 				callback(timeFilterred);
 			});
 		});
 	}

 	function locationFilter(similar_items,callback){
		var distance_th; //initialize to some value
		var close_buisnesses = [];
		//biz id = M2SjLXsuAy5RNKwxaA5E1g
		//similar_items =  JSON.parse(similar_items);
		//console.log(similar_items);
		//lat:36.092
 //long: 115.1758
		var longi = 111.1758;
		var lat = 33.092; 
		
		for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			// console.log(Object.keys(similar_items[attributename]["0"]['_doc']));
   			var longitude = similar_items[attributename]["0"]['_doc'].longitude * -1;
			var latitude = similar_items[attributename]["0"]['_doc'].latitude;
			//console.log(longitude + "     " + latitude);
			//var distance = Math.sqrt(Math.pow((longitude - longi), 2) + Math.pow((latitude - lat), 2));
			var distance = dist(latitude,longitude,lat,longi);
			distance = distance/100000;
			console.log(distance);

			/*for(var i = 0; i < )*/


			//console.log(buffer);
			if(distance < 5){ // condition yet to write
				
				close_buisnesses.push(similar_items[attributename]["0"]);
				
			}

		}

		console.log("done locationFiltered");

		callback(close_buisnesses);
    }

    function timefilter(similar_items,callback){
    	var d = new Date();
	    
	    var hour = parseInt(d.getHours());
	    console.log("curretn time : " + hour);
	    var weekday = new Array(7);
		weekday[0]=  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var day = weekday[d.getDay()];
		//console.log("day is " + day);
	    var openBusiness = [];
	    var responseCount = 0;
	  //  console.log(JSON.stringify(similar_items));
	   // console.log(Object.keys(similar_items));
	    for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			 //console.log(Object.keys(similar_items[attributename]));
   			 ///console.log(day);
   			 //console.log(JSON.stringify(similar_items[attributename]['_doc'].hours));
   			 if(typeof similar_items[attributename]['_doc'].hours[day] == 'undefined' || similar_items[attributename]['_doc'].hours[day] == null){
   			 	console.log("undefined");
   			 	continue;
   			 }
   			 	
   			var open = similar_items[attributename]['_doc'].hours[day].open;
			var close = similar_items[attributename]['_doc'].hours[day].close;
		 	open = parseInt(open.split(":")[0]);
		 	close = parseInt(close.split(":")[0]);
		 	console.log(open + "     " + close + " hours " + hour);
			
			//REmove this 'if' for getting result when fetching wo working hours
			if(hour>open && hour<close){ // condition yet to write
				for(var i = 0 ; i < 50 ; i++)
				{
				    if (buffer[i]['_doc']['val'][0] == similar_items[attributename]['_doc'].business_id ) {
				    	similar_items[attributename]['_doc'].similarity = buffer[i]['_doc']['val'][1];
				    	similar_items[attributename]['_doc'].commonsupport = buffer[i]['_doc']['val'][2];
				        /*results.push(obj.list[i]);*/
				    }
				}
				openBusiness.push(similar_items[attributename]);
				responseCount++;
				if(responseCount>=6)
					break;
				
			}
		}
		//console.log("-----------------"+openBusiness);

		callback(openBusiness);
    }

    function dist(Lat1,Long1,Lat2,Long2){
    	//console.log(Lat1+" -- "+Long1+" -- "+Lat2+" -- "+Long2);
		distance = geolib.getDistance(
	     {latitude: Lat1, longitude: Long1}, 
	     {latitude: Lat2, longitude: Long2}
	     );

		return distance;
    }
