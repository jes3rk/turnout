function getData(fips) {
  $.get("/api/data/" + fips)
    .done(function(data) {
      console.log(data);
      pieGenerator(data.pieData.data);
    });
};

function pieGenerator(data) {
  var width = 500,
      height = 500,
      radius = (Math.min(width, height) / 2) - 10;

  var formatNumber = d3.format(",d");

  var x = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

  var y = d3.scaleSqrt()
      .range([0, radius]);

  var partition = d3.partition();

  var arc = d3.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


  var svg = d3.select(".pie-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  var root = d3.hierarchy(data);
  root.sum(function(d) { return d.size; });

  svg.selectAll("path")
      .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        switch (d.data.name) {
          case "Registered Voters":
            return "#e74b3b";
            break;
          case "Unregistered Voters":
            return "#3bb1d0";
            break;
          case "Voter":
            return "#ee8d1d";
            break;
          case "Non-voter":
            return "#4f5f66";
            break;
          case "Men":
            return "#9ec4f7";
            break;
          case "Women":
            return "#ff99e8";
            break;
          default:
            return "white";
        };
      })
      .on("click", click)
    .append("title")
      .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

  function click(d) {
    svg.transition()
        .duration(750)
        .tween("scale", function() {
          var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
              yd = d3.interpolate(y.domain(), [d.y0, 1]),
              yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
          return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
      .selectAll("path")
        .attrTween("d", function(d) { return function() { return arc(d); }; });
  };

  d3.select(self.frameElement).style("height", height + "px");
};

function barGenerator(data) {
  var width,height
     var chartWidth, chartHeight
     var margin

     var svg2 = d3.select("#graph").append("svg")
     var axisLayer = svg2.append("g").classed("axisLayer", true)
     var chartLayer = svg2.append("g").classed("chartLayer", true)

     var xScale = d3.scaleBand()

     var xInScale = d3.scaleBand();

     var yScale = d3.scaleLinear()

     var color = d3.scaleOrdinal()
         .range(["#c3f2eb", "#f9c7e2", "#9988a4", "#e59966", "#7fa3eb", "#d0743c", "#ff8c00"]);

 data = [['contry',2000,2001,2002],
 ['b365',2704659,4499890,2159981],
 ['PWH',2027307,3277946,987651],
 ['BH',1208495,2141490,897162]]

     console.log(cast)
     d3.csv("data.csv", cast,  main)
     //console.log(main)
     function cast(d) {
         Object.keys(d).forEach(function(key){
             if (!isNaN(+d[key])) d[key] = +d[key]
         })
         return d
     }

     function main(data) {



         var nested = d3.nest()
             .rollup(function(d){ delete d[0].contry; return d[0] })
             .key(function(d){ return d.contry })
             .entries(data)

         nested.forEach(function(d){
             d.age = Object.keys(d.value).map(function(key){
                 return {key:key, value:d.value[key]}
             })
         })

         setSize(nested)
         drawAxis()
         drawChart(nested)
     }

     function setSize(nested) {
         width = document.querySelector("#graph").clientWidth
         height = document.querySelector("#graph").clientHeight

         margin = {top:0, left:100, bottom:40, right:0 }


         chartWidth = width - (margin.left+margin.right)
         chartHeight = height - (margin.top+margin.bottom)

         svg2.attr("width", width).attr("height", height)

         axisLayer.attr("width", width).attr("height", height)

         chartLayer
             .attr("width", chartWidth)
             .attr("height", chartHeight)
             .attr("transform", "translate("+[margin.left, margin.top]+")")



         xScale.domain(nested.map(function(d) { return d.key }))
             .range([0, chartWidth]).paddingInner(0.1)


         var ageNames = Object.keys(nested[0].value)

         xInScale.domain(ageNames).range([0, xScale.bandwidth()])

         var yMax = d3.max(nested.map(function(d){
             var values = Object.keys(d.value).map(function(key){
                 return d.value[key]
             })
             return d3.max(values)
         }))

         yScale.domain([0, yMax]).range([chartHeight, 0])

     }

     function drawChart(nested) {
         var t = d3.transition()
             .duration(1000)
             .ease(d3.easeLinear)


         var contry = chartLayer.selectAll(".contry")
             .data(nested)

         var newCountry = contry.enter().append("g").attr("class", "contry")


         contry.merge(newCountry)
             .attr("transform", function(d) { return "translate(" + [xScale(d.key), 0] + ")"; });


         var bar = newCountry.selectAll(".bar")
             .data(function(d){ return d.age })

         var newBar = bar.enter().append("rect").attr("class", "bar")


         bar.merge(newBar)
             .attr("width", xInScale.bandwidth())
             .attr("height", 0)
             .attr("fill", function(d) { return color(d.key); })
             .attr("transform", function(d) { return "translate(" + [xInScale(d.key), chartHeight] + ")" })



         //アニメーション
        bar.merge(newBar).transition(t)
             .attr("height", function(d) { return chartHeight - yScale(d.value); })
             .attr("transform", function(d) { return "translate(" + [xInScale(d.key), yScale(d.value)] + ")" })
     }

     function drawAxis(){
         var yAxis = d3.axisLeft(yScale)
             .tickSizeInner(-chartWidth)

         axisLayer.append("g")
             .attr("transform", "translate("+[margin.left, margin.top]+")")
             .attr("class", "axis y")
             .call(yAxis);

         var xAxis = d3.axisBottom(xScale)

         axisLayer.append("g")
             .attr("class", "axis x")
             .attr("transform", "translate("+[margin.left, chartHeight]+")")
             .call(xAxis);

     }    
};
