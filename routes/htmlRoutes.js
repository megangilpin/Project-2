var db = require("../models");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
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
