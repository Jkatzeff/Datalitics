94c94
<     var width, height, projection, path, svg, mapLayer, div, max_deaths, min_deaths
---
>     var width, height, projection, path, svg, mapLayer, div, max_data, min_data
97a98,104
>     var additive_data = {}
>     var max_per_year = {}
> 
>     var max_so_far = 0;
> 
>     var min_data = 0;
>     var max_data = 0;
105c112
<                   .domain([1, 255])
---
>                   .domain([0, 1])
114c121
<         width = 2000,
---
>         width = 1600,
122,123c129,130
<                         .scale(350)
<                         .translate([width/40, height/2]);
---
>                         .scale(200)
>                         .translate([width/20, height/2]);
134,135c141
<             .attr("height", height)
< 			.attr("transform", "translate(0," + 100 + ")");
---
>             .attr("height", height);
145,155d150
< 	function loadMaps(){
< 		var fwidth = 800,
< 		fheight = 800,
< 		awidth = 800,
< 		aheight = 800,
< 		uwidth = 800,
< 		uheight = 800;
< 		console.log('loading all three maps');
< 		
< 	}
< 	
166,169c161
<     function enterData(error, world,data){
<         max_deaths = d3.max(data, function(d){return +d[dataName]});
<         min_deaths = d3.min(data, function(d){return +d[dataName]});
<         manageColors(min_deaths,max_deaths);
---
>     function enterData(error,world,data){
173a166,167
> 
> 
175a170
>             additive_data[features[j][id_JSON]]=0;
176a172,182
>         // console.log(additive_data)
>         // data.forEach(function(d){ max_per_year[+d["Year"]]+= })
>         max_data = d3.max(data, function(d){additive_data[d["Year"]]})
>         // max_data = d3.max(data, function(d){additive_data[d["Year"]]+= +d[dataName]; return additive_data[d[id_CSV]]});
>         min_data = d3.min(data, function(d){return additive_data[d[id_CSV]]});
>         // max_deaths = d3.max(data, function(d){return +d[dataName]});
>         // min_deaths = d3.min(data, function(d){return +d[dataName]});
> 
>         // console.log(max_data)
>         manageColors(min_data,max_data);
> 
187a194
>         //additive stuff
193,194c200,201
<     function manageColors(min_deaths, max_deaths){
<          color.domain([min_deaths,max_deaths]);
---
>     function manageColors(min_data, max_data){
>          color.domain([min_data,max_data]);
196,197c203,204
<         .domain([min_deaths,max_deaths])
<         .range([0,300]);     
---
>         .domain([min_data,max_data])
>         .range([0,300]);
212c219
<         .attr("stop-color", d3.interpolateReds(max_deaths));
---
>         .attr("stop-color", d3.interpolateReds(max_data));
214d220
< 		//the rect for scale at the top
218,219c224
<         .style("fill", "url(#linear-gradient)")
< 		.attr("transform", "translate(0," + 120 + ")");
---
>         .style("fill", "url(#linear-gradient)");
221c226
<                          .domain([min_deaths, max_deaths])
---
>                          .domain([min_data,max_data])
231c236
<              .attr("transform", "translate(0," + 220 + ")")
---
>              .attr("transform", "translate(0," + 120 + ")")
234a240,257
>     //include d3 scale 
>     //var d3ScaleChromatic = require("d3-scale-chromatic");
>     
>     //gradient scale at top
>     //function spectralColors(max_deaths){
>     //    console.log('scaling colors to spectrum');
>     //}
>     
>     //update to rainbow color scale
>     //function updateColor(d, max_deaths){
>     //    console.log("updating color string");
>     //    return d3.interpolateSpectral(d / max_deaths);
>     //}
>     
>     function updateColor(d, max_deaths){
>         
>     }
>     
253,254c276,293
<                 if(d){return d3.interpolateReds(+d["Time Series"][+countryInfo[+currentAttr]]/max_deaths);}
<                 else{return d3.interpolateReds(min_deaths);}
---
>                 if(d){
>                     var add_to = +d["Time Series"][+countryInfo[+currentAttr]];
>                     if (add_to){
>                         additive_data[d[id_JSON]]+= add_to;
>                     }
>                 }
>                 // console.log(additive_data);
> 
>                 // var temp_max = d3.max(additive_data)
>                 // console.log(additive_data)
>                 // console.log(temp_max)
>                 // console.log(temp_max)
>                 var arr = Object.keys( additive_data ).map(function ( key ) { return additive_data[key]; });
>                 var temp_max = Math.max.apply( null, arr );
>                 console.log(temp_max);
>                 // console.log(additive_data)
>                 // console.log(additive_data[d[id_JSON]]);
>                 return d3.interpolateReds(additive_data[d[id_JSON]]/temp_max);
269a309
>                             enterFiles();
294c334
<         div.html(d.id + "\n" +  year + "\n" + d["Time Series"][year] + "<br />")
---
>         div.html(d.id + "\n" +  year + "\n" + additive_data[d[id_JSON]] + "<br />")
300c340
< }
---
> }
\ No newline at end of file
