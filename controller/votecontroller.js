var express = require("express");
var db = require("../models");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var Washington = require("../models/turnout.js");

// home page router
router.get("/", function(req, res) {
  // some sequelize call
  var hbsObject;
  res.render("index");
});

// results page Router
router.get("/Washington/:code", function(req, res) {
  // console.log(db);
  var state = req.params.state;
  db.Washington_state_data.findOne({
    where: {
      fips_code: req.params.code
    }
  }).then(function(data) {
    // console.log(data);
    var hbsObject = data.dataValues;
    console.log(hbsObject);
    res.render("results", hbsObject)
  })
})
module.exports = router;
