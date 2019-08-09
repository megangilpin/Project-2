var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Needs to be deleted after events gets linked back end
  app.get("/events", function(req, res) {
    db.Events.findAll({}).then(function(result) {
      res.render("events", {
        layout: "view",
        events: result
      });
    });
  });

  app.get("/guestlist", function(req, res) {
    res.render("guestlist", {
      layout: "view"
    });
  });

  // app.get("/events", function(req, res) {
  //   res.render("events", {
  //     layout: "view"
  //   });
  // });

  // This is currently what /guestlist shows. Will need to look more like /event/:id when connected to backend.
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

  app.get("/register", function(req, res) {
    res.render("register", {
      layout: "view"
    });
  });

  // Need?
  app.post("/eventpage", function(req, res) {
    var name = req.body.name;
    var pass = req.body.pass;
    if (name == "Admin" && pass == "123456") {
      res.json({ name: name, pass: pass });
    }
  });
};
