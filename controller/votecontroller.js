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
    // console.log(hbsObject);
    res.render("results", hbsObject)
  });
});

// data grabber for pie chart
router.get("/api/pie/:code", function(req, res) {
  db.Washington_state_data.findOne({
    where: {
      fips_code: req.params.code
    }
  }).then(function(data) {
    var da = data.dataValues;
    var obj = {
      name: da.county,
      fips_code: da.fips_code,
      data: {
        name: "Eligible Voters",
        children: [
          {
            name: "Registered Voters",
            children: [
              {
                name: "Voted",
                children: [
                  { name: "Men", size: da.male_ballots_cast },
                  { name: "Women", size: da.female_ballots_cast }
                ]
              },
              { name: "Non-voter", size: da.total_regis_pop-da.total_ballots_cast}
            ]
          },
          { name: "Unregistered Voters", size: da.total_elig_pop-da.total_regis_pop }
        ]
      }
    };
    res.json(obj);
  });
});
module.exports = router;
