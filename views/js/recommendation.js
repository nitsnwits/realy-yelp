$(document).ready(function()
{
	
	 
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
              	var businesses = parseResponse(output_string);
              	var businessMeta = fetchMetaData();
              	var finalReco = locationFilter(businessMeta);
              	console.log(finalReco);
                
              },
              error: function (error) {
                  alert('Error');
              }
          });
	}

	function fetchMetaData(businesses){

		var ajax_url = "/business?business_id="+businesses;   
		$.ajax({
              type: "GET",
              url:ajax_url,
              contentType: 'application/json',
                     
              success: function(results) 
              {   
	            
              },
              error: function (error) {
                  alert('Error');
              }
          });
	}

	function parseResponse(data){
		
		console.log(data["0"].val[0]);
		var businesses=""

		for(var i = 0 ; i < 20 ; i++){
			businesses+=data[i].val[0]+",";
		}
		businesses = businesses.substring(0,businesses.length-1);
	    console.log(businesses)
		return businesses;
 	}

 	function locationFilter( similar_items){
	var distance_th; //initialize to some value
	var close_buisnesses = [];
	
	var longi = 37.3353;
	var lat = 121.8813; 

	for(var i=0;i<20;i++){
		var longitude = similar_items[i].longitude;
		var lattitude = similar_items[i].latitude;
		var distance = Math.sqrt(Math.pow((longitude - longi), 2) + Math.pow((latitude - lat)));
		if(distance < 10){ // condition yet to write
			close_buisnesses.push(similar_items[i]);
			
		}
	}
	return close_buisnesses;
}

});