var express = require('express');
var router = express.Router();
var Geocodio = require('geocodio');

var config = {
    api_key: '7b3d44a014513bbd488455a84a174d15844a3bd'
}

var geocodio = new Geocodio(config);
var userLatLong;


//this function will get the city, state and return a longitude/lat of the location.
// geocodio.get('geocode', {q: address}, function(err, response){
//     if (err) throw err;
//
//     var res = JSON.parse(response);
//     console.log(res.results[0].location);
// });



var todoItems = [
  {id: 1, desc: 'foo'},
  {id: 2, desc: 'bar'},
  {id: 3, desc: 'baz'}
]


router.get('/', function(req, res){
  res.render('index', {
    title: 'Leaflet',
    items: todoItems
  })
});

router.post('/add', function (req, res){
  var userSearch = req.body.userSearch;
  todoItems.push({
    id: todoItems.length+1,
    desc: userSearch
  });
  var address = userSearch;
  geocodio.get('geocode', {q: address}, function(err, response){
      if (err) throw err;

      var res = JSON.parse(response);
      console.log(res.results[0].location);
      userLatLong = res.results[0].location;
  });

  res.redirect('/')
});

console.log(userLatLong);

module.exports = router;
