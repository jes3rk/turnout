var express = require("express");
var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
var router = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated.js");








// Import the model (cat.js) to use its database functions.
// var Washington = require("../models/turnout.js");

// home page router
router.get("/", function(req, res) {
    // some sequelize call
    var hbsObject;
    res.render("index");
});


router.get("/login", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
});

router.get("/members", function(req, res) {
    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

router.get("/signup", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
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

router.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
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




module.exports = router;










// module.exports = function(app) {
//   // app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   //   res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//   // });

//  //// Just trying to test passport... delete later  



// }