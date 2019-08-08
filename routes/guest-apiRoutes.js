// fill this in with the route to access the guests names for events
var db = require("../models");

module.exports = function(app) {
  app.get("/api/guests", function(req, res) {
    db.Guests.findAll({}).then(function(dbGuest) {
      console.log(dbGuest);
      res.render("guestlist", dbGuest);
    });
  });

  // working
  app.post("/api/guests/add", function(req, res) {
    console.log("ADDING NEW GUEST");
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var org = req.body.org;
    // var vip = req.body.vip;

    console.log(req.body);

    db.Guests.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      organization: org,
      vip: vip
    }).then(function(dbGuest) {
      console.log(dbGuest);
      res.json(dbGuest);
    });
  });

  app.put("/api/guests", function(req, res) {
    console.log(req);
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var org = req.body.organization;
    var vip = req.body.vip;
    var checked_in = req.body.checked_in;
    // will be happening on a differnet api call

    db.Guests.update(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        organization: org
        // vip: vip
      },
      {
        wjere: {
          id: req.body.id
        }
      }
    ).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  //   CHECK IN PROCESS -----------------------
  app.put("/api/guests/checkin/:id", function(req, res) {
    console.log(req);
    console.log("in the checkin api");
    db.Guests.update(
      {
        checked_in: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(dbGuest) {
      alert("successful checkin");
      res.json(dbGuest);
    });
  });

  //   MAILGUN PROCESS -----------------------
  //   See the sendmail.js file

  // Delete a guest by id
  app.delete("/api/guests/:id", function(req, res) {
    db.Guests.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGuest) {
      //   TRIGGER EMAIL TO BE SENT TO THE GUEST STATING THAT THEY HAVE BEEN REMOVED
      res.json(dbGuest);
    });
  });
};
