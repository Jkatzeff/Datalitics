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
// @param id_CSV: id in CSV file that matches id in JSON (example: "Country")
// @param id_JSON: id in JSON file that matched id in CSV (example: "id")

// CSV must include "Year" as a variable.

function makeMap(csvNames,jsonNames,id_CSV,id_JSON){
    var width, height, projection, path, svg, mapLayer, div, max_data, min_data
        countryInfo = [], 
        currentAttr = 0, 
        animating = false;
    var additive_data = {}
    var max_per_year = {}

    var max_so_far = 0;

    var var_names;
    var curr_var = 0;
    var num_vars;

    var min_data = 0;
    var max_data = 0;
    var csv_names_arr = csvNames.split(",");
    var json_names_arr = jsonNames.split(",");
    var current_dataset=0;
    var current_map=0;
    
    num_datasets=csv_names_arr.length;
    num_maps =json_names_arr.length;    


    function begin(){
        loadMap();
        animateMap();
    }
    function loadMap(){
        width = screen.width, //window.innerWidth
        height = screen.height; //400? window.innerHeight
        div = d3.select("#map")
                    .append("div")
                    .attr("class", "tooltip");


        projection = d3.geoMercator()
                        .scale(width/4)
                        .translate([width/2, 3*height/4]);
        path = d3.geoPath()
                 .projection(projection);

        svg = d3.select("#map")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");
        
        mapLayer = g.append("g")
                        .classed("map-layer", true);

        enterFiles();

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
    function enterData(error,world,data){
        var center = d3.geoCentroid(world);
        projection.center(center);

        var features = world.features;


        for(var j in features){
            features[j]["Time Series"] = {}
            additive_data[features[j][id_JSON]]=0;
        }

        var_names = Object.keys(data[0]);
        var temp_index = var_names.indexOf("Year");
        var_names.splice(temp_index,1);
        temp_index = var_names.indexOf(id_CSV);
        var_names.splice(temp_index,1);
        num_vars = var_names.length;

        max_data = d3.max(data, function(d){return additive_data[d["Year"]]})
        min_data = d3.min(data, function(d){return additive_data[d[id_CSV]]});

        manageColors(min_data,max_data);
        for (var i in data){
            for(var j in features){
                if(features[j][id_JSON] == data[i][id_CSV]){
                    features[j]["Time Series"][data[i]["Year"]] = data[i][var_names[curr_var]];
                }
                if (countryInfo.indexOf(data[i]["Year"]) == -1){
                    countryInfo.push(data[i]["Year"]);
                }
            }
        }
        d3.select('#clock').html("Current year: " + countryInfo[currentAttr]);
        d3.select('#dataname').html("Current dataset: " + csv_names_arr[current_dataset]);
        d3.select('#mapname').html("Current map: " + json_names_arr[current_map]);
        console.log(var_names[curr_var]);
        d3.select('#varname').html("Current variable: " + var_names[curr_var]);
        drawMap(world);
    }
    function manageColors(min_data, max_data){
        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
        .attr(id_JSON, "linear-gradient");

        linearGradient.append("stop") 
        .attr("offset", "0%")   
        .attr("stop-color", d3.interpolateReds(0)); 

        linearGradient.append("stop") 
        .attr("offset", "100%")   
        .attr("stop-color", d3.interpolateReds(1));
        svg.append("rect")
        .attr("width", width)
        .attr("height", 60)
        .style("fill", "url(#linear-gradient)")
        .attr("transform", "translate(0," + 120 + ")");
        var xScale = d3.scaleLinear()
                         .domain([min_data,max_data])
                         .range([0,width]);

        var xAxis = d3.axisBottom()
                        .scale(xScale)
                        .ticks(20)
                        .tickFormat(d3.format("d"));

        svg.append("g")
             .attr("class", "axis")
             .attr("transform", "translate(0," + 120 + ")")
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
                if(d){
                    var add_to = +d["Time Series"][+countryInfo[+currentAttr]];
                    if (add_to){
                        additive_data[d[id_JSON]]+= add_to;
                    }
                }
                var arr = Object.keys( additive_data ).map(function ( key ) { return additive_data[key]; });
                var temp_max = Math.max.apply( null, arr );
                max_data = temp_max;
                manageColors(min_data,max_data);
                return d3.interpolateReds(additive_data[d[id_JSON]]/max_data);
            })
    }
    function animateMap(){
        var timer;
        d3.select("#play")
            .on('click', function(){
                if(animating == false){
                    timer = setInterval(function(){

                        if(currentAttr < countryInfo.length-1){
                            currentAttr+=1;
                        }
                        else{
                            currentAttr = 0;
                            enterFiles();
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
        d3.select("#currvar")
            .on('click', function(){
                curr_var = (curr_var+1)%num_vars;
                currentAttr=0;
                clearMap();
                loadMap();
            })
    }
    function mouseClick(d){
        var year = countryInfo[currentAttr];
        div.html(d.id + "\n" +  year + "\n" + additive_data[d[id_JSON]] + "<br />")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px")
                        .style("opacity", 100); 
    }
    begin();    
}