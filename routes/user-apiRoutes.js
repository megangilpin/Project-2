var db = require("../models");
var passport = require("passport");

// Calls for the adminsTable
module.exports = function(app) {
  // Create a new user
  app.post("/api/user", function(req, res) {
    db.Admins.create(req.body)
      .then(function(result) {
        console.log(result);
        res.send(result);
      })
      .catch(function(error) {
        console.log(error);
        res.send(error);
      });
  });

  // User login
  app.post(
    "/api/user/login",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    res.redirect("/events/")
  );
};
