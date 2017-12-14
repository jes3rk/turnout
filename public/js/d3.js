function pieData(fips) {
  $.get("/api/pie/" + fips)
    .done(function(data) {
      console.log(data);
      pieGenerator(data.data);
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
      // .attr("id")
      // .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
      .style("fill", function(d) {
        switch (d.data.name) {
          case "Registered Voters":
            return "#e74b3b";
            break;
          case "Unregistered Voters":
            return "#3bb1d0";
            break;
          case "Voted":
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

}
