$(document).ready(function()
{
	'use strict'
	
	 
	fetchRecommendation(1);

	function fetchRecommendation(businessType){

		
		alert($("#hidden").val())
		
        var businessId = $("#hidden").val();	         
        var ajax_url = "/business/hotels/-xFO1E3OiDMmdqdjwUM_DA/similar.json";      
                      
          $.ajax({
              type: "GET",
              url:ajax_url,
              contentType: 'application/json',
                     
              success: function(output_string) 
              {   
              	alert("Yipiiiiiii got it: " + output_string)
              	return output_string;
              	
              },
              	/*var businessMeta = fetchMetaData(businesses);
              	console.log(businessMeta); */            	
              	//var finalReco = locationFilter(businessMeta);
              	
                
              
              error: function (error) {
                  alert('Error');
              }
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
                  alert('Error');
              }
          });
	}

	function parseResponse(data,callback){
		
		//console.log(data["0"].val[0]);
		var businesses=""

		for(var i = 0 ; i < 50 ; i++){
			businesses+=data[i].val[0]+",";
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
		console.log(similar_items);
		var longi = 37.3353;
		var lat = 121.8813; 

		for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			var longitude = similar_items[attributename]["0"].longitude;
			var latitude = similar_items[attributename]["0"].latitude;
			alert(longitude + "     " + latitude);
			//var distance = Math.sqrt(Math.pow((longitude - longi), 2) + Math.pow((latitude - lat), 2));
			var distance = dist(latitude,longitude,lat,longi);
			alert(distance);
			console.log(distance);
			if(distance < 180){ // condition yet to write
				close_buisnesses.push(similar_items[attributename]["0"]);
				
			}

		}

		
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
			alert(open + "     " + close);
			
			if(true){ // condition yet to write
				openBusiness.push(similar_items[attributename]["0"]);
				
			}
		}
    }

});