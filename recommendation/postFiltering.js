var env = require("../config/environment")
	, apiController = require('../controllers/apiController')
 	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
	, apiModel = require('../models/apiModel')
	, geolib = require('geolib');

module.exports.generateFinalReco = function(output_string,callback){

			//console.log("output_string" + output_string);
			parseResponse(output_string,function(businesses){
				getBusinessFromIds(businesses,function(results){
					// console.log("meta info is "+results);
					            var locationFiltered = locationFilter(results);
					           // var timeFilterred = timefilter(locationFiltered);
					           //console.log("came herew");
					           //console.log(locationFiltered);
					            callback(locationFiltered);
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

	function fetchMetaData(businesses){

		var ajax_url = "/business?business_id="+businesses;   
		//console.log(ajax_url);
		$.ajax({
              type: "GET",
              url:ajax_url,

              contentType: 'application/json',           
              success: function(results) 
              {    
              	console.log("meta info is "+results);
	            return results;
              },
              error: function (error) {
                  console.log('Error');
              }
          });
	}

	function parseResponse(data,callback){
		//console.log("data:----------"+ JSON.stringify(data));
		//console.log("length----------"+data.length);
		//console.log(data["0"].val[0]);
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

 	function locationFilter(similar_items){
		var distance_th; //initialize to some value
		var close_buisnesses = [];
		//similar_items =  JSON.parse(similar_items);
		//console.log(similar_items);
		var longi = 37.3353;
		var lat = 121.8813; 

		for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			// console.log(Object.keys(similar_items[attributename]["0"]['_doc']));
   			var longitude = similar_items[attributename]["0"]['_doc'].longitude;
			var latitude = similar_items[attributename]["0"]['_doc'].latitude;
			//console.log(longitude + "     " + latitude);
			//var distance = Math.sqrt(Math.pow((longitude - longi), 2) + Math.pow((latitude - lat), 2));
			var distance = dist(latitude,longitude,lat,longi);
			distance = distance/100000;
			// console.log(distance);
			//console.log(distance);
			if(distance < 164.3){ // condition yet to write
				close_buisnesses.push(similar_items[attributename]["0"]);
				
			}

		}

		// console.log("done");
		return close_buisnesses;
    }

    function timefilter(similar_items){
    	var d = new Date();
	    var day = new d.getDay();
	    var hour = d.getHours();
	    var openBusiness = [];
	    for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			var open = similar_items[attributename]["0"].day.open;
			var close = similar_items[attributename]["0"].day.close;
			console.log(open + "     " + close);
			
			if(true){ // condition yet to write
				openBusiness.push(similar_items[attributename]["0"]);
				
			}
		}
    }

    function dist(Lat1,Long1,Lat2,Long2){
    	//console.log(Lat1+" -- "+Long1+" -- "+Lat2+" -- "+Long2);
		distance = geolib.getDistance(
	     {latitude: Lat1, longitude: Long1}, 
	     {latitude: Lat2, longitude: Long2}
	     );

		return distance;
    }
