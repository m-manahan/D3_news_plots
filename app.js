// @TODO: YOUR CODE HERE!
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {
// if the SVG area isn't empty when the browser loads,
// remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;
// Append SVG element







  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
// Append group element
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//console.log(margin.left);
//console.log(margin.right);

  d3.csv("data.csv", function(error, newsData){
  if (error) throw error;
  var stateLabels = [];
  newsData.forEach(function(data){
    
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.abbr = String(data.abbr);
   // console.log(data.poverty); //values tha go on the x axis
   // console.log(data.healthcare); //values that go on the y axis
  
    stateLabels.push(data.abbr);
    });
    
    //console.log(stateLabels);
    var xLinearScale = d3.scaleLinear() //d3.extent(medalData, d => d.date) //[8, d3.max(newsData, d => d.poverty)]
    .domain([8, d3.max(newsData, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(newsData, d => d.healthcare)])
      .range([height, 0]);
    // create axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // append axes
    //console.log(height);
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);


      

      //working code
     chartGroup.append("circle")
    //append circles
    var circlesGroup = chartGroup.selectAll(".node")//circle
      .data(newsData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "12") //changes the radius of the circle
      .attr("fill", "lightblue")
      .attr("stroke-width", "1")
      .attr("stroke", "black")
      .attr("opacity", ".3");
    // chartGroup.append("g").append("text").text(stateLabels[10]);
      // .append("text").text(function(d,i){
      //   return d.abbr;
      //    });
//end working code


    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`Poverty: ${d.poverty}%<hr>Lacks Healthcare: ${d.healthcare}%`);
      });
    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);  //attach to the chartgroup

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) { //good code
      toolTip.show(d);
    })
   
   
      .on("mouseout", function(d) {
        toolTip.hide(d);
      });
//console.log(stateLabels);
var text = chartGroup;
var text = chartGroup.selectAll("null"); 
text.data(newsData)
.enter()
.append('text')
.text(d => d.abbr)
.attr('color', 'black')
.attr('font-size', 12)
.attr("x", d => xLinearScale(d.poverty)-9)
.attr("y", d => yLinearScale(d.healthcare)+4);
     
        
//end of reading csv file
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 9)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare %");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + 31})`)
.attr("class", "axisText")
.text("Poverty %");

});
}


// Import data from the data.csv file
// ================================


console.log("Hello peers!");