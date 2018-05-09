function drawCircles(data, element, projection, popup_div, longitude_field, latitude_field, fatalities_field){
    element.selectAll(".shooting-circles")
        .remove();

    var locations = element.selectAll("circles")
                    .data(data);

    locations.enter()
    .append("circle")
    .attr("cx", function(d){
        return projection([d[longitude_field], d[latitude_field]])[0];
    })
    .attr("cy", function(d){
        return projection([d[longitude_field], d[latitude_field]])[1];
    })
    .attr("r", function(d){
        return d[fatalities_field]/4;
    })
    .style("fill", "red")
    .attr("class", "shooting-circles")
    .on("mouseover", function(d) {		
        popup_div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        popup_div.html(d.Case)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
    })					
    .on("mouseout", function(d) {		
        popup_div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });

    locations.exit()
            .remove();
}

function slider(map_svg, circles_g, projection, data, popup_div, minYear, maxYear, slider_width, longitude_field, latitude_field, fatalities_field, playButton){
    var currentValue=minYear;
    var moving = false;
    
    var x = d3.scaleLinear()
                .domain([minYear, maxYear])
                .range([0,slider_width*3/4])
                .clamp(true);
    
    var slider = map_svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(50,20)");
    
    var handle = slider.insert("circle", ".track-overlay")
                        .attr("class", "handle")
                        .attr("r", 9);

    slider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function(){ 
                return this.parentNode.appendChild(this.cloneNode(true)); 
            })
            .attr("class", "track-inset")
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-overlay")
            .call(d3.drag()
                    .on("drag", function(){

                        currentValue = Math.round(x.invert(d3.event.x));
                        moveCircle(currentValue, handle, x);
                        var yearOf = data.filter(function(d){
                            if (d.DATE.substring(0,4) == currentValue){
                                return d;
                            }
                        });

                        drawCircles(yearOf, circles_g, projection, popup_div, longitude_field, latitude_field, fatalities_field);

            }));


    slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0,18)")
            .selectAll("text")
            .data(x.ticks(20))
            .enter()
            .append("text")
            .attr("x", x)
            .attr("text-anchor", "middle")
            .text(function(d){return d });
    
    playButton.on("click", function() {
        var button = d3.select(this);
        if (button.text() == "Pause") {
            button.text("Play");
            moving = false;
            clearInterval(timer);
        }
        else{
            button.text("Pause");
            moving = true;
            timer = setInterval(step, 400);
        }
    })
//    
    function step(){
        moveCircle(currentValue, handle, x);
        var yearOf = data.filter(function(d){
            if (d.DATE.substring(0,4) == currentValue){
                return d;
            }
        });
        drawCircles(yearOf, circles_g, projection, popup_div, longitude_field, latitude_field, fatalities_field);
        currentValue += 1;
        if (currentValue > maxYear){
            moving = false;
            currentValue = 0;
            clearInterval(timer);
            playButton.text("Play");
            console.log("Slider moving: " + moving);
        }
    }

}

function moveCircle(value, handle, line){
    handle.attr("cx", line(value));
//    console.log(value);
}
