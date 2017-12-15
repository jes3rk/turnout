var express = require("express");
var db = require("../models");

var router = express.Router();

function pct(num) {
  return (num * 100).toFixed(2) + "%";
};

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
    var da = data.dataValues;
    hbsObject.legend_first = [
      // { name: "Eligible Voters", count: da.total_elig_pop, pct: pct(1), color: "white" },
      { name: "Registered Voters", count: da.total_regis_pop, pct: pct(da.total_reg_pop_pct), color: "#e74b3b" },
      { name: "Unregistered Voters", count: da.total_elig_pop - da.total_regis_pop, pct: pct(1 - da.total_reg_pop_pct), color: "#3bb1d0" },
      { name: "Voter", count: da.total_ballots_cast, pct: pct(da.total_turnout_reg_pct), color: "#ee8d1d" }
    ];
    hbsObject.legend_second = [
      { name: "Registered Non-Voter", count: da.total_regis_pop - da.total_ballots_cast, pct: pct(1 - da.total_turnout_reg_pct), color: "#4f5f66"},
      { name: "Men", count: da.male_ballots_cast, pct: pct(da.male_ballots_cast / da.total_ballots_cast), color: "#9ec4f7" },
      { name: "Women", count: da.female_ballots_cast, pct: pct(da.female_ballots_cast / da.total_ballots_cast), color: "#ff99e8" }
    ];
    // console.log(hbsObject);
    res.render("results", hbsObject)
  }).catch(function(err) {
    console.log(err);
    res.render("error");
  });
});

// data grabber for pie chart
router.get("/api/data/:code", function(req, res) {
  db.Washington_state_data.findOne({
    where: {
      fips_code: req.params.code
    }
  }).then(function(data) {
    var da = data.dataValues;
    var pie = {
      name: da.county,
      fips_code: da.fips_code,
      data: {
        name: "Eligible Voters",
        children: [
          {
            name: "Registered Voters",
            children: [
              {
                name: "Voter",
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
    var bar = {

    };
    var result = {
      pieData: pie,
      barData: bar
    };
    res.json(result);
  });
});

router.get("/api/bar/:code", function(req, res) {
  db.Washington_state_data.findOne({

  })
});
module.exports = router;
