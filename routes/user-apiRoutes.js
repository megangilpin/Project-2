var db = require("../models");

// Calls for the adminsTable
module.exports = function(app) {
  // Create a new user
  app.post("/api/user", function(req, res) {
    console.log("User Added");
    db.Admins.create(req.body).then(function(req) {
      res.json(req.body);
    });
  });
};
