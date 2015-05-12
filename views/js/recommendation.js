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

		
		//alert($("#hidden").val())
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
              	populate(businessType,output_string);
                d3piechart(output_string,'similarity','chart');
                d3piechart(output_string,'commonsupport','chart2');

              	//return output_string;
              	
              },
              	/*var businessMeta = fetchMetaData(businesses);
              	console.log(businessMeta); */            	
              	//var finalReco = locationFilter(businessMeta);
              	
                
              
              error: function (error) {
                  alert('Error');
              }
          });
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

		for(var i=0;i<6;i++){
			var frontdiv = '#f-reco'+i;
			console.log(frontdiv);
			var backdiv = '#b-reco'+i;
			var frontText = "<table class='recotable'><tr><td>"+ output_string[i]['name'] +"</td></tr><tr><td>"+ output_string[i]['full_address']+"</td></tr><tr><td> Stars: "+ output_string[i]['stars'] +"</td></tr></table>";
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
			
			 if(hour>open & hour<close){ // condition yet to write
				openBusiness.push(similar_items[attributename]["0"]);
				
			 }
		  }
    }



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