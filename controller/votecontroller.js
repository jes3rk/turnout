var express = require("express");
var db = require("../models");

var passport = require("../config/passport");
var path = require("path");


var Op = db.Sequelize.Op;


var router = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated.js");

function pct(num) {
  return mul100(num) + "%";
};

function mul100(num) {
  return (num * 100).toFixed(2);
};

// Import the model (cat.js) to use its database functions.
// var Washington = require("../models/turnout.js");

// home page router
router.get("/", function(req, res) {
  if (!req.user) {
        res.render("login")
    }else{
    var hbsObject;
    res.render("index");
  }
});


router.get("/login", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
});

router.get("/members", function(req, res) {
    res.render("index");
});

router.get("/signup", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
});

router.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/");
});

router.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        console.log(err);
        res.json(err);
    });
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/api/user_data", function(req, res) {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});

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
  db.Washington_state_data.findAll({
    where: {
      fips_code: {
        [Op.or]: [req.params.code, "null"]
      }
    }
  }).then(function(data) {
    // console.log(data[1].dataValues);
    var da = data[0].dataValues;
    var ba = data[1].dataValues;
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
    var total = [
      { cat: "Washington State", percentage: ba.total_turnout_pop_pct, label: "Turnout by Eligible Voters" },
      { cat: da.county + " County", percentage: da.total_turnout_pop_pct, label: "Turnout by Eligible Voters" },
      { cat: "Washington State", percentage: ba.total_turnout_reg_pct, label: "Turnout by Registered Voters" },
      { cat: da.county + " County", percentage: da.total_turnout_reg_pct, label: "Turnout by Registered Voters" },
      { cat: "Washington State", percentage: ba.total_reg_pop_pct, label: "% Of Eligible Voters Registered" },
      { cat: da.county + " County", percentage: da.total_reg_pop_pct, label: "% Of Eligible Voters Registered" }
    ];
    function scatter() {
      db.Washington_state_data.findAll({
        attributes: ["county", "total_elig_pop", "total_turnout_pop_pct"]
      }).then(function(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          var val = data[i].dataValues;
          var obj = {
            county: val.county,
            pop: val.total_elig_pop,
            turnout: val.total_turnout_pop_pct
          };
          result.scatterData.push(obj);
        };
        // res.json for the api call... not for the scatter function
        res.json(result);
      }).catch(function(err) {
        console.log(err);
      });
    };

    scatter();
    var result = {
      pieData: pie,
      barData: {
        total: total
      },
      scatterData: []
    };
  }).catch(function(err) {
    console.log(err);
  });
});

router.get("/api/leaf", function(req, res) {
  db.Washington_state_data.findAll({
    attributes: ["county", "total_turnout_pop_pct", "total_elig_pop", "total_ballots_cast", "fips_code"],
    where: {
      fips_code:  {
        [Op.not]: "null"
      }
    }
  }).then(function(data) {
    // console.log(data[0].dataValues);
    var obj = []
    for (var i = 0; i < data.length; i++) {
      obj.push(data[i].dataValues);
    };
    res.json(obj);
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;










// module.exports = function(app) {
//   // app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   //   res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//   // });

//  //// Just trying to test passport... delete later



// }
