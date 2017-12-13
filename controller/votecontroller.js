var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Washington = require("../models/turnout.js");

router.get("/", function(req, res) {
  // some sequelize call
  var hbsObject;
  res.render("index");
});

module.exports = router;
