function getData(fips) {
  $.get("/api/data/" + fips)
    .done(function(data) {
      console.log(data);
      pieGenerator(data.pieData.data);
      barChart(data.barData.total);
      scatterPlot(data.scatterData)
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

function barChart(data) {
  var svg = d3.select("#bar"),
  margin = {
    top: 20,
    right: 35,
    bottom: 30,
    left: 40
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

  // var color = d3.scaleOrdinal(d3.schemeCategory20);
  var color = d3.scaleOrdinal(["#006637", "#066873"])

  var x = d3.scaleBand().rangeRound([0, width])
    .padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var ymaxdomain = d3.max(data, function(d) {
    // return d.percentage;
    return 1;
  });
  x.domain(data.map(function(d) {
    return d.label
  }));
  y.domain([0, ymaxdomain]);

  var x1 = d3.scaleBand()
    .rangeRound([0, x.bandwidth()])
    .padding(0.05)
    .domain(data.map(function(d) {
      return d.cat;
    }));

  color.domain(data.map(function(d) {
    return d.cat;
  }));

  var groups = g.selectAll(null)
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d) {
      return "translate(" + x(d.label) + ",0)";
    })

  var bars = groups.selectAll(null)
    .data(function(d) {
      return [d]
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return x1(d.cat)
    })
    .attr("y", function(d) {
      return y(d.percentage);
    })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) {
      return 0;
    })
    .attr("fill", function(d) {
      return color(d.cat)
    })
    .append("title")
      .text(function(d) { return d.cat + "\n" + (d.percentage * 100).toFixed(2) + "%"});

  d3.selectAll("rect").transition()
    .attr("height", function(d) { return height - y(d.percentage); });

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisRight(y).ticks(null, "%"))
    .attr("transform", "translate(" + (width) + ", 0)")
    .append("text")
    .attr("x", 2)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start");
};


function scatterPlot(data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scaleLog().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var svg = d3.select(".scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.pop; }));
  y.domain([0, d3.max(data, function(d) { return d.turnout; })]);

  svg.selectAll("dot")
       .data(data)
     .enter().append("circle")
       .attr("r", 5)
       .attr("cx", function(d) { return x(d.pop); })
       .attr("cy", function(d) { return y(d.turnout); });

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
};
