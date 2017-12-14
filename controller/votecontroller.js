var express = require("express");
var db = require("../models");
var passport = require("../config/passport");
var path = require("path");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Washington = require("../models/turnout.js");

// home page router
router.get("/", function(req, res) {
  // some sequelize call
  var hbsObject;
  res.render("index");
});

<<<<<<< HEAD
router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

=======
// results page Router
router.get("/:state/:code", function(req, res) {
  var state = req.params.state;
  db.state.findOne({
    where: {
      fips_code: req.params.code
    }
  }).then(function(data) {
    console.log(data);
    var hbsObject = {

    }
    res.render("results", hbsObject)
  })
})
>>>>>>> 73e8d87f3ad58b0923b1052260ed3f820582e79a
module.exports = router;










// module.exports = function(app) {
//   // app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   //   res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//   // });

//  //// Just trying to test passport... delete later  
 


// }

