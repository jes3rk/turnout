var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Washington = require("../models/turnout.js");

// home page router
router.get("/", function(req, res) {
  // some sequelize call
  var hbsObject;
  res.render("index");
});

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
module.exports = router;
