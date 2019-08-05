var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/portal", function(req, res) {
    db.Events.findAll({}).then(function(result) {
      res.render("portal", {
        layout: "portal",
        msg: "Welcome!",
        events: result
      });
    });
  });

  app.get("/guests", function(req, res) {
    db.Events.findAll({}).then(function(result) {
      res.render("guests", {
        layout: "guestsview",
        msg: "Your Guestlist",
        guests: result
      });
    });
  });
  // Load event page and pass in an event by id
  app.get("/event/:id", function(req, res) {
    db.Events.findOne({ where: { id: req.params.id } }).then(function(result) {
      res.render("event", {
        event: result
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
