function getData(fips) {
  $.get("/api/data/" + fips)
    .done(function(data) {
      console.log(data);
      pieGenerator(data.pieData.data);
      barGenerator(data.barData);
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
  var chartWidth       = 300,
      barHeight        = 20,
      groupHeight      = barHeight * data.series.length,
      gapBetweenGroups = 10,
      spaceForLabels   = 150,
      spaceForLegend   = 150;

  // Zip the series data together (first values, second values, etc.)
  var zippedData = [];
  for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
      zippedData.push(data.series[j].values[i]);
    }
  }

  // Color scale
  var color = d3.scaleOrdinal(["red", "blue", "purple", "green"]);
  var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

  var x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);

  var y = d3.scaleLinear()
      .range([chartHeight + gapBetweenGroups, 0]);

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat('')
      .tickSize(0)
      .orient("left");

  // Specify the chart area and dimensions
  var chart = d3.select(".bar-chart")
      .attr("width", spaceForLabels + chartWidth + spaceForLegend)
      .attr("height", chartHeight);

  // Create bars
  var bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
      });

  // Create rectangles of the correct width
  bar.append("rect")
      .attr("fill", function(d,i) { return color(i % data.series.length); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1);

  // Add text label in bar
  bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("fill", "red")
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  // Draw labels
  bar.append("text")
      .attr("class", "label")
      .attr("x", function(d) { return - 10; })
      .attr("y", groupHeight / 2)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % data.series.length === 0)
          return data.labels[Math.floor(i/data.series.length)];
        else
          return ""});

  chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
        .call(yAxis);

  // Draw legend
  var legendRectSize = 18,
      legendSpacing  = 4;

  var legend = chart.selectAll('.legend')
      .data(data.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups/2;
          var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });

  legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });

  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.label; });

};
