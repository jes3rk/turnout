var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var app = express();

app.engine("html", require('ejs').renderFile);
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


// app.get('/', function(req, res){
//   res.render('index.html')
// })
//
// app.post('/', function(req, res){
//   console.log(req.body.userSearch);
// });

app.use(require('./app.js'))


app.listen(port, function(){
  console.log('connection on port: ' + port);
});
