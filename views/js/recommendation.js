$(document).ready(function()
{
	'use strict'
	
	 
	fetchRecommendation("rest");

	$('#rest').click(function() {
        fetchRecommendation("rest");
    });

    $('#bar').click(function() {
        fetchRecommendation("bar");
    });
    $('#gym').click(function() {
        fetchRecommendation("gym");
    });
    $('#books').click(function() {
        fetchRecommendation("books");
    });

	function fetchRecommendation(businessType){

		//hotel: M2SjLXsuAy5RNKwxaA5E1g
//bar: KZfhb_wZj1qqKMJIN0PF7Q



		//alert($("#hidden").val())
   // console.log(userName);
		var ajax_url = "";
        var businessId = $("#hidden").val();
        if(businessType=="rest")	         
        	ajax_url = "/business/hotels/-xFO1E3OiDMmdqdjwUM_DA/similar.json";
        else if(businessType=="gym")
        	ajax_url = "/business/gym/-25FveJPYkjFxVJhu75F3w/similar.json";
        else if(businessType=="books")
        	ajax_url = "/business/books/-FTT107VGsLs6MzvK1GY2Q/similar.json";
        else
        	ajax_url = "/business/bars/-yxfBYGB6SEqszmxJxd97A/similar.json";
                      
          $.ajax({
              type: "GET",
              url:ajax_url,
              contentType: 'application/json',
                     
              success: function(output_string) 
              {   
              	//alert("Yipiiiiiii got it: " + output_string)
              	//ssreturn output_string;
                if(output_string.length == 0){
                  //alert("no rest");
                  noResult(businessType);
                }else{
                	populate(businessType,output_string);
                  d3piechart(output_string,'similarity','chart');
                  d3piechart(output_string,'commonsupport','chart2');
                }
              	//return output_string;
              	
              },
              	/*var businessMeta = fetchMetaData(businesses);
              	console.log(businessMeta); */            	
              	//var finalReco = locationFilter(businessMeta);
              	
                
              
              error: function (error) {
                  //alert('Error');
                  noResult(businessType);
              }
          });
	}

  function noResult(businessType){
    var frontdiv = '#f-reco0';
    var backdiv = '#b-reco0';
    var frontText = "";
    if(businessType=="rest")
      frontText = "<table class='recotable'><tr><td>Sorry We couldn't find open restaurant(s) at this time.</td></tr></table>";
    else
      frontText = "<table class='recotable'><tr><td>Sorry We couldn't find open bar(s) at this time.</td></tr></table>";

    $(frontdiv).empty();
    $(frontdiv).removeClass();
    $(backdiv).empty();
    $(backdiv).removeClass();
    $(backdiv).html(frontText);
    $(frontdiv).html(frontText); 
  }

	function populate(businessType,output_string){
		console.log(JSON.stringify(output_string));
		var imgclass ="";
		if(businessType=="rest")	         
        	imgclass = "rest-background common_bg";
        else if(businessType=="gym")
        	imgclass = "gym-background common_bg";
        else if(businessType=="books")
        	imgclass = "books-background common_bg";
        else
        	imgclass = "bar-background common_bg";


      var d = new Date();
      
      var hour = d.getHours();
      var weekday = new Array(7);
      weekday[0]=  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      var day = weekday[d.getDay()];

		for(var i=0;i<6;i++){
			var frontdiv = '#f-reco'+i;
			console.log(frontdiv);
			var backdiv = '#b-reco'+i;
			var frontText = "<table class='recotable'><tr><td>"+ output_string[i]['name'] +"</td></tr><tr><td>"+ output_string[i]['full_address']+"</td></tr><tr><td> Stars: "+ output_string[i]['stars'] +"</td></tr>";
      frontText+= " <tr><td>Opens at: "+ output_string[i]['hours'][day].open +"</td></tr><tr><td>Closes at: "+ output_string[i]['hours'][day].close +"</td></tr></table>";
			var backtext = "<table class='recotable'><tr><td> Common Support: "+  output_string[i]['commonsupport'] +"</tr><tr><td> Similarity: "+  output_string[i]['similarity'] +"</td></tr></table>";
			console.log(imgclass);
			$(frontdiv).empty();
			$(frontdiv).removeClass();
			$(frontdiv).addClass(imgclass);
			$(frontdiv).html(frontText);
			$(backdiv).empty();
			$(backdiv).removeClass();
			$(backdiv).addClass(imgclass);
			$(backdiv).html(backtext);
		}
		//console.log(output_string[0]['address'])
		//alert(Object.keys(output_string));

	}
	
   /* function timefilter(similar_items){
    	var d = new Date();
	    var day = new d.getDay();
	    var hour = d.getHours();
	    var openBusiness = [];
	    for(var attributename in similar_items){
   			 //console.log(attributename+"--->: "+ similar_items[attributename]["0"]._id);
   			var open = similar_items[attributename]["0"].day.open;
			var close = similar_items[attributename]["0"].day.close;
			alert(open + "     " + close);
			
			 if(hour>open & hour<close){ // condition yet to write
				openBusiness.push(similar_items[attributename]["0"]);
				
			 }
		  }
    }*/



    function d3piechart(data,content,divid){           
             $(".featurette-head").text('Data Analysis');
             $(".well").text('');
             
             var names = [];
             var similarity = [];
             for(var i=0;i<6;i++){
              names[i]=data[i]['name'];
              similarity[i]=data[i][content];
             }
                $("#"+divid).empty();    
             var pie = new d3pie(divid, {
              header: {
                title: { 
                }
              },
               size: {
               canvasHeight: 600,
               canvasWidth: 700
               },
              data: {
                content: [

                  
                  { label: names[0], value: similarity[0], color: '#e6211a'},
                  { label:  names[1], value:similarity[1], color: '#a7211d'},
                  { label:  names[2], value: similarity[2],color :'#e69595'},
                        { label:  names[3], value: similarity[3],color : '#eb4d48'},
                        { label:  names[4], value: similarity[4], color : '#d43f3a'},
                        { label:  names[5], value: similarity[5], color : '#690400'},
                ]
              }
      });
    
  }

});