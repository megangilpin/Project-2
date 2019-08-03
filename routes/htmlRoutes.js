var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Events.findAll({}).then(function(dbEvent) {
      res.render("index", {
        msg: "Welcome!",
        events: dbEvent
      });
    });
  });

  // Load event page and pass in an event by id
  app.get("/events/:id", function(req, res) {
    db.Events.findOne({ where: { id: req.params.id } }).then(function(dbEvent) {
      res.render("event", {
        event: dbEvent
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
