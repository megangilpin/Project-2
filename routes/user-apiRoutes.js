var db = require("../models");

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
};
