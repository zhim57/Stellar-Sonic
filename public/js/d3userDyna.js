function bubbleChart() {
// // set the dimensions and margins of the graph

// var wWidth = window.innerWidth;


// // append the svg object to the body of the page
var svg = d3.select(this.divTarget)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)

// // Read data


$.ajax({
    url: this.url,
    method: "GET"
})
    .then(data => {
        // console.log(data); // Ja- commented this console lod as it shows repetitive objects-sorry for the inconvenience
        window._debugVar = data;
    //     // Filter a bit the data
    //     //data = data.filter(function(d){ return d.value = genre })


        // Color palette for genre?
        var color = d3.scaleOrdinal()
            .domain(data.map(e => e.genre))
            .range(d3.schemeCategory20);

        // Size scale for genres
        var size = d3.scaleLinear()
            .domain([0, data.map(e => e.number).reduce( (max, curr) => curr > max? curr : max, 0 )])
            .range([8, this.width/10])  // circle will be between 8 and 55 px wide

        // create a tooltip
        var Tooltip = d3.select(this.divTarget)
            .append("div")
            .attr("class", "tooltip")


        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
        }
        var mousemove = function (d) {
            //$.ajax( ... something ..).then( data => {
            //  ... tooltip stuff here ...
            //})

            Tooltip
                .html('<u>' + d.genre.toUpperCase() + '</u>' + "<br>" + "No of songs" + d.number + "<br>" + "SONGS" + "<br>" + d.title + "<br>" + "ARTISTS" + "<br>" + d.artist)
                // .style("left", (d3.mouse(this)[0] + 20) + "px")
                // .style("top", (d3.mouse(this)[1]) + "px")
                .style("left", "0px")
                .style("bottom", "0px")
            // .style("z-index", "1")
            // .style("top", "100%")
            // .style("position", "absolute")
            // .style("left","50%")
            // .style("margin-left","-60px")

        }
        var mouseleave = function (d) {
            // Tooltip
            //   .style("opacity", 0)
        }

        // Initialize the circle: all located at the center of the svg area
        var node = svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function (d) { return size(parseInt(d.number)) })
            .attr("cx", this.width / 2)
            .attr("cy", this.height / 2)
            .style("fill", function (d) { return color(d.genre) })
            .attr("stroke", "#fff200")
            .style("stroke-width", 0.1)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag() // call specific function when circle is dragged
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Features of the forces applied to the nodes:
        var simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(this.width / 2).y(this.height / 2)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(.2).radius(function (d) { return (size(parseInt(d.number)) + 3) }).iterations(1)) // Force that avoids circle overlapping

        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
        simulation
            .nodes(data)
            .on("tick", function (d) {
                node
                    .attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
            });

        // What happens when a circle is dragged?
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(.15).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(.15).restart();
            d.fx = null;
            d.fy = null;
        }
    // chart.width = function(value) {
    //     if (!arguments.length) {
    //         return width;
    //     }
    //     width = value;
    //     return chart;
    // };

    // chart.height = function(value) {
    //     if (!arguments.length) {
    //         return height;
    //     }
    //     height = value;
    //     return chart;
    // };

// }
    });
}
function setWidthHeight(){

this.width = 600
this.height = 500

// // Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }
var wWidth = window.innerWidth;
if(wWidth < 576){
    this.width = wWidth - 10;
}

// // Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }
else if(wWidth < 768){
   this.width = wWidth - 10;
}


// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }
else if(wWidth < 992){
    this.width = 750 - 10;
 }
// // Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

else if(wWidth < 992){
    this.width = 970 - 50;
 }
 else{
    this.width = 1170 -50;
 }

}

function setWidthHeightHalf(){

    this.width = 600
    this.height = 500
    
    // // Small devices (landscape phones, 576px and up)
    // @media (min-width: 576px) { ... }
    var wWidth = window.innerWidth;
    if(wWidth < 576){
        this.width = wWidth - 10;
    }
    
    // // Medium devices (tablets, 768px and up)
    // @media (min-width: 768px) { ... }
    else if(wWidth < 768){
       this.width = wWidth/2 - 10;
    }
    
    
    // // Large devices (desktops, 992px and up)
    // @media (min-width: 992px) { ... }
    else if(wWidth < 992){
        this.width = 750/2 - 10;
     }
    // // Extra large devices (large desktops, 1200px and up)
    // @media (min-width: 1200px) { ... }
    
    else if(wWidth < 992){
        this.width = 970/2 - 50;
     }
     else{
        this.width = 1170/2 -50;
     }
    
    }
var bubble1 = {
    width: 500,
    height: 700,
    url: "/api/test0",
    divTarget: "#musicdata",
    setWidthHeight: setWidthHeight,
    bubbleChart: bubbleChart
};

bubble1.setWidthHeight();
bubble1.bubbleChart();

var bubble2 = {
    width: 500,
    height: 700,
    url: "/api/test0",
    divTarget: "#musicdata1",
    setWidthHeight: setWidthHeightHalf,
    bubbleChart: bubbleChart
};

bubble2.setWidthHeight();
bubble2.bubbleChart();

var bubble3 = {
    width: 500,
    height: 700,
    url: "/api/test0",
    divTarget: "#musicdata2",
    setWidthHeight: setWidthHeightHalf,
    bubbleChart: bubbleChart
};

bubble3.setWidthHeight();
bubble3.bubbleChart();

var bubble4 = {
    width: 500,
    height: 700,
    url: "/api/test0",
    divTarget: "#musicdata3",
    setWidthHeight: setWidthHeightHalf,
    bubbleChart: bubbleChart
};

bubble4.setWidthHeight();
bubble4.bubbleChart();

var bubble5 = {
    width: 500,
    height: 700,
    url: "/api/test0",
    divTarget: "#musicdata4",
    setWidthHeight: setWidthHeightHalf,
    bubbleChart: bubbleChart
};

bubble5.setWidthHeight();
bubble5.bubbleChart();