var express = require("express");
var db = require("../models");
var passport = require("../config/passport");
var path = require("path");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Washington = require("../models/turnout.js");

router.get("/", function(req, res) {
  // some sequelize call
  var hbsObject;
  res.render("index");
});

router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

module.exports = router;










// module.exports = function(app) {
//   // app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   //   res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//   // });

//  //// Just trying to test passport... delete later  
 


// }

