// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8"/>
//     <title>Gun violence visualization by country</title> 
//     <script src="https://d3js.org/d3.v4.min.js"></script>
//     <script src="http://d3js.org/queue.v1.min.js"></script>
//     <script src="http://d3js.org/topojson.v1.min.js"></script>

// </head>

// <style>
//     #wrapper {
//         width: 1600px;
//         margin: -100px auto 0;
//     }
//     #map {
//         width: 1600px;
//         height: 1600px;
//         position: relative;  
//     }
//     .background{
//         fill: #eee;
//     }
//     .map-layer {
// /*        fill: black;*/
//         stroke: pink;
//     }
//     .country {
//         /*fill: steelblue;*/
//         stroke: white;
//     }
//     #play { 
//         position: absolute;
//         top: 200px;
//         left: 800px; 
//     }
//     #clock {
//         position: absolute;
//         top: 150px;
//         left: 815px;
//     }
//     div.tooltip {   
//         position: absolute;         
//         text-align: center;         
//         width: 100px;                   
//         height: 50px;                   
//         padding: 1px;               
//         font: 20px sans-serif;      
//         background: lightsteelblue;         
//         border-radius: 8px;         
//         pointer-events: none;
//         opacity: 0;	
//     }
//     .button {
//     background-color: goldenrod;
//     border-radius: 20%;
//     width: 20%;
//     color: white;
//     padding: 15px 32px;
//     text-align: left;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 24px;
//     margin: 4px 2px;
//     cursor: pointer;
// }

// </style>
// <body>
//     <div id="wrapper">  
//       <div id="map"></div>
//       <button class="button" id="play">Start animation!</button>
//       <span id="clock">current_year</span>
//     </div>
// </body>
// <script src="https://d3js.org/d3.v4.min.js"></script>
// <script src="https://d3js.org/topojson.v2.min.js"></script>
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

// Copy above code to your .html file
/*****************************************************************************/

// makeMap: Deals with making map
// @param csvName: path to CSV File with data in it
// @param jsonName: path to geo-json file with geometries in it
// @param dataName: variable name within CSV you'd like to visualize (numeric data)
// @param id_CSV: id in CSV file that matches id in JSON (example: "Country")
// @param id_JSON: id in JSON file that matched id in CSV (example: "id")

// CSV must include "Year" as a variable.

function makeMap(csvNames,jsonNames,dataName,id_CSV,id_JSON){
    var width, height, projection, path, svg, mapLayer, div, max_deaths, min_deaths
        countryInfo = [], 
        currentAttr = 0, 
        animating = false;
    var csv_names_arr = csvNames.split(",");
    var json_names_arr = jsonNames.split(",");
    var current_dataset=0;
    var current_map=0;
    num_datasets=csv_names_arr.length;
    num_maps =json_names_arr.length;
    var color = d3.scaleLinear()
                  .domain([1, 255])
                  .range([d3.rgb(0,0,0), d3.rgb(255,0,0)]);
    

    function begin(){
        loadMap();
        animateMap();
    }
    function loadMap(){
        //map container size
        width = window.innerWidth;
        height = window.innerHeight; //400?
        
		div = d3.select("#map")
                    .append("div")
                    .attr("class", "tooltip");


        projection = d3.geoMercator()
                        .scale(350)
                        .translate([width/40, height/2]);
        path = d3.geoPath()
                 .projection(projection);

        svg = d3.select("#map")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height)
			.attr("transform", "translate(0," + 100 + ")");

        var g = svg.append("g");
        
        mapLayer = g.append("g")
                        .classed("map-layer", true);

        enterFiles();

    }
	function loadMaps(){
		var fwidth = 800,
		fheight = 800,
		awidth = 800,
		aheight = 800,
		uwidth = 800,
		uheight = 800;
		console.log('loading all three maps');
		
	}
	
    function clearMap(){
        d3.select("div.tooltip").remove()
        d3.select("svg").remove()
    }
    function enterFiles(){
        queue()
        .defer(d3.json,json_names_arr[current_map])
        .defer(d3.csv,csv_names_arr[current_dataset])
        .await(enterData);
    }    
    function enterData(error, world,data){
        max_deaths = d3.max(data, function(d){return +d[dataName]});
        min_deaths = d3.min(data, function(d){return +d[dataName]});
        manageColors(min_deaths,max_deaths);
        var center = d3.geoCentroid(world);
        projection.center(center);

        var features = world.features;
        for(var j in features){
            features[j]["Time Series"] = {}
        }
        for (var i in data){
            // data[i] = Object containing country name, code, year, value;
            for(var j in features){
                if(features[j][id_JSON] == data[i][id_CSV]){
                    features[j]["Time Series"][data[i]["Year"]] = data[i][dataName];
                }
                if (countryInfo.indexOf(data[i]["Year"]) == -1){
                    countryInfo.push(data[i]["Year"]);
                }
            }
        }
        d3.select('#clock').html("Current year: " + countryInfo[currentAttr]);
        d3.select('#dataname').html("Current dataset: " + csv_names_arr[current_dataset])
        d3.select('#mapname').html("Current map: " + json_names_arr[current_map])
        drawMap(world);
    }
    function manageColors(min_deaths, max_deaths){
         color.domain([min_deaths,max_deaths]);
        var y = d3.scaleLinear()
        .domain([min_deaths,max_deaths])
        .range([0,300]);     
        
        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
        .attr(id_JSON, "linear-gradient");

        linearGradient.append("stop") 
        .attr("offset", "0%")   
        // .attr("stop-color", color(min_deaths)); 
        .attr("stop-color", d3.interpolateReds(0)); 

        linearGradient.append("stop") 
        .attr("offset", "100%")   
        // .attr("stop-color", color(max_deaths));
        .attr("stop-color", d3.interpolateReds(max_deaths));

		//the rect for scale at the top
        svg.append("rect")
        .attr("width", width)
        .attr("height", 200)
        .style("fill", "url(#linear-gradient)")
		.attr("transform", "translate(0," + 120 + ")");
        var xScale = d3.scaleLinear()
                         .domain([min_deaths, max_deaths])
                         .range([0,width]);

        var xAxis = d3.axisBottom()
                        .scale(xScale)
                        .ticks(20)
                        .tickFormat(d3.format("d"));

        svg.append("g")
             .attr("class", "axis")
             .attr("transform", "translate(0," + 220 + ")")
             .call(xAxis);  
    }
    
    function drawMap(world){
        svg.selectAll(".country")
                .data(world.features)
                .enter()
                .append("path")
                .attr("class","country")
                .attr(id_JSON, function(d){return "code_"+ d[id_JSON]},true)
                .attr("d", path)
                .attr('vector-effect', 'non-scaling-stroke')
                .on("click",mouseClick);

                changeMap();
    }
    function changeMap(){
        d3.selectAll(".country")
            .transition()
            .duration(500)
            .style("fill", function(d){
                if(d){return d3.interpolateReds(+d["Time Series"][+countryInfo[+currentAttr]]/max_deaths);}
                else{return d3.interpolateReds(min_deaths);}
            })
    }
    function animateMap(){
        var timer;
        // d3.select("#datase")
        d3.select("#play")
            .on('click', function(){
                if(animating == false){
                    timer = setInterval(function(){

                        if(currentAttr < countryInfo.length-1){
                            currentAttr+=1;
                        }
                        else{
                            currentAttr = 0;
                        }
                        changeMap();
                        d3.select("#clock").html("Current year: " + countryInfo[currentAttr]);
                    }, 500);

                    d3.select(this).html('stop');
                    animating = true;
                }
                else{
                    clearInterval(timer);
                    d3.select(this).html('play');
                    animating = false;
                }
            })
        d3.select("#currdata")
            .on('click', function(){
                current_dataset = (current_dataset + 1)%num_datasets;
                current_map = (current_map + 1)%num_maps;
                clearMap();
                loadMap();
            })
    }
    function mouseClick(d){
        var year = countryInfo[currentAttr];
        div.html(d.id + "\n" +  year + "\n" + d["Time Series"][year] + "<br />")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px")
                        .style("opacity", 100); 
    }
    begin();    
}
