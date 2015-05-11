function d3piechart(data){
var data='';
     
       $(".featurette-head").text('Data Analysis');
       $(".well").text('');
     	alert(data);
          $("#chart").empty();    
       var pie = new d3pie("chart", {
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

			var values = data.split(',');
			
			{ label: values[0], value: 5, color: '#e6211a'},
			{ label:  values[1], value:15, color: '#a7211d'},
			{ label:  values[2], value: 10,color :'#e69595'},
            { label:  values[3].id, value: 5,color : '#eb4d48'},
            { label:  values[4].id, value: 3, color : '#d43f3a'},
            { label:  values[5].id, value: 5, color : '#690400'},
		]
	}
    });
    
}