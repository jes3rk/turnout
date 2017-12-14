var express = require('express');
var router = express.Router();
var Geocodio = require('geocodio');

var config = {
    api_key: '7b3d44a014513bbd488455a84a174d15844a3bd'
}

var geocodio = new Geocodio(config);
var userLatLong;

address = 'fairfax, va'

//this function will get the city, state and return a longitude/lat of the location.
geocodio.get('geocode', {q: address}, function(err, response){
    if (err) throw err;

    var res = JSON.parse(response);
    console.log(res.results[0].location);
    console.log(res.results[0].address_components);
    
});

const newLocal = './public/data/counties.geojson';

var washington = require(newLocal)



// washington.forEach(function(){
    console.log(JSON.stringify(washington))
    console.log(washington[0])


//   geocodio.get('geocode', {q: address}, function(err, response){
//       if (err) throw err;

//       var res = JSON.parse(response);
//       console.log(res.results[0].location);
//       userLatLong = res.results[0].location;
//   });

// console.log(userLatLong);

