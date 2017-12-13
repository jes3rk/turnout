var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //   res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  // });

 //// Just trying to test passport... delete later  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


}
