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

  app.get("/guestlist", function(req, res) {
    res.render("guestlist", {
      layout: "view"
    });
  });

  app.get("/events", function (req, res) {
    res.render("events", {
      layout: "view"
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
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/events", function(req, res) {
    res.render("events");
  });

  app.get("/guestlist", function(req, res) {
    res.render("guestlist");
  });


  app.post("/eventpage", function(req, res) {
    var name = req.body.name;
    var pass = req.body.pass;
    if(name=="Admin"&&pass=="123456"){
      res.json({ name:name, pass:pass });
    }
  });
};
