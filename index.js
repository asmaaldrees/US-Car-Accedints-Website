//Weather Conditions D3.js Horizontal Plot

function drawD3HorizontalPlot(data1) {

   
// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 80, left: 150},
    width = 960 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".visual-4")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("accident_count_Weather_Condition.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 330000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-weight", "bolder")
    .style("font-size", "15px")
    .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Weather_Condition; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))
    .style("font-weight", "bolder")
    .style("font-size", "15px")

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Weather_Condition); })
    .attr("width", function(d) { return x(d.Accident_Count); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#4472c4")
    .on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("Number of Accidents: "+d.Accident_Count)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 3400) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(1100)      
                .style("opacity", 0);
            });


    // Define the div for the tooltip
var div = d3.select(".visual-4").append("div")   
    .attr("class", "tooltip1")               
    .style("opacity", 0);


  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 60) + ")")
      .style("text-anchor", "middle")
      .style("font-weight", "bolder")
    .style("font-size", "20px")
      .text("Number of Accidents");

  

  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-weight", "bolder")
    .style("font-size", "20px")
      .text("Weather Condition");      


});

}


//Traffic Signals D3.js Donut Plot

function drawD3DonutPlot(data1) {

	 var margin = {top: 20, right: 30, bottom: 80, left: 150},
    width = 960 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select(".visual-2")
  .append("svg")
    .attr("width", width )
    .attr("height", height )
    .attr("radius", Math.min(width, height) / 2)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

radius = Math.min(width, height) / 2

var color = d3.scaleOrdinal(["#cc8400", "#4472c4"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Count; });

var path = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 120);

var label = d3.arc()
    .outerRadius(radius + 30)
    .innerRadius(radius - 20);

d3.csv("accident_count_signal_donut_chart.csv", function(d) {
  d.Count = +d.Count;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = svg1.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("Percentage of Accidents: "+d.data.Percentage +"%")  
                .style("left", (d3.event.pageX + 200) + "px")     
                .style("top", (d3.event.pageY - 1300) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(1100)      
                .style("opacity", 0);
            });

  arc.append("path")
      .attr("d", path)

      .attr("fill", function(d) { return color(d.data.Category); });

    

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.8em")
      .style("font-weight", "bolder")
    .style("font-size", "15px")
    .style("margin-left", "100px !important")
      .text(function(d) { return d.data.Category; });

      //Define Tooltip
    var div = d3.select(".visual-2").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
});



}


//read the files
Promise.all([d3.csv('accident_count_Weather_Condition.csv'), d3.csv('accident_count_signal_donut_chart.csv')])
    .then(function (data) {
        let weatherConditionsData = data[0];
        let trafficSignalsData = data[1];
        drawD3HorizontalPlot(weatherConditionsData);
        drawD3DonutPlot(trafficSignalsData);
    });