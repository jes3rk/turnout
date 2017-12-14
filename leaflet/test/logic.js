

var mymap = L.map('mapId').setView([37.0902, -95.7129], 5);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow'
  }).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
//   }).addTo(mymap);
//
//   var polygon = L.polygon([
//   // [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.0047]
//   //polygon needs 3 coordinates
// ]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

var counties = new L.geoJson();
counties.addTo(mymap);

$.ajax({
dataType: "json",
url: "../counties.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        counties.addData(data);
    });
}
})

L.geoJson(counties).addTo(mymap);
