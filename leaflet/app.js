var Geocodio = require('geocodio');

var config = {
    api_key: '7b3d44a014513bbd488455a84a174d15844a3bd'
}

var geocodio = new Geocodio(config);


var address = 'fairfax, va'; //this would need to change into user input.

//this function will get the city, state and return a longitude/lat of the location.
geocodio.get('geocode', {q: address}, function(err, response){
    if (err) throw err;

    var res = JSON.parse(response);
    console.log(res.results[0].location);
});
