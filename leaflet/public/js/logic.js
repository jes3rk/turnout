alert('connected bitch');

var statesData = new L.geoJson();
// statesData.addTo(map);

$.ajax({
dataType: "json",
url: "../data/us-states.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        statesData.addData(data);
    });
}
}).error(function() {});

// var statesData = newGeoJason.AJAX('../data/us-states.geojson')

var mapboxAccessToken = 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow';
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    // attribution: ...
}).addTo(map);

L.geoJson(statesDatas).addTo(map);




// var mymap = L.map('mapId').setView([37.0902, -95.7129], 5);
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox.light',
//   accessToken: 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow'
//   }).addTo(mymap);

// var circle = L.circle([34.9592, -116.4194], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 5000
//   }).addTo(mymap);

//   function getColor(d) {
//     return d > 1000 ? '#800026' :
//            d > 500  ? '#BD0026' :
//            d > 200  ? '#E31A1C' :
//            d > 100  ? '#FC4E2A' :
//            d > 50   ? '#FD8D3C' :
//            d > 20   ? '#FEB24C' :
//            d > 10   ? '#FED976' :
//                       '#FFEDA0';
// }

// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.density),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// L.geoJson(counties, {style: style}).addTo();
// //
// //   var polygon = L.polygon([
// //   // [51.509, -0.08],
// //   [51.503, -0.06],
// //   [51.51, -0.0047]
// //   //polygon needs min 3 coordinates
// // ]).addTo(mymap);

// // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// // circle.bindPopup("I am a circle.");
// // polygon.bindPopup("I am a polygon.");

// var counties = new L.geoJson();
// counties.addTo(mymap);

// $.ajax({
// dataType: "json",
// url: "./data/counties.geojson",
// success: function(data) {
//     $(data.features).each(function(key, data) {
//         counties.addData(data);
//     });
// }
// })
