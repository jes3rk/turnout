

var express = require('express');
var router = express.Router();

var userLatLong;

const newLocal = './counties.geojson';

var washington = require(newLocal)


var geoObject = JSON.parse(washington);

console.log(geoObject.features[0]);
// var features = [];

// features = geoObject.features;

    //console.log(JSON.stringify(washington));
   //console.log(features[0])


//   geocodio.get('geocode', {q: address}, function(err, response){
//       if (err) throw err;

//       var res = JSON.parse(response);
//       console.log(res.results[0].location);
//       userLatLong = res.results[0].location;
//   });

// console.log(userLatLong);
