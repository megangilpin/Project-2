// fill this in with the route to access the guests names for events

var db = require("../models");

module.exports = function(app) {
  app.get("/api/guests", function(req, res) {
    db.Guests.findAll({}).then(function(dbGuest) {
      res.json(dbGuest);
    });
  });

  app.post("/api/guests/add", function(req, res) {
    console.log("---dbGuest on guest-apiRoute");
    db.Guests.create(req.body).then(function(dbGuest) {
      console.log(dbGuest);
      res.json(dbGuest);
    });
  });

  app.put("/api/guests", function(req, res) {
    console.log(req);
    var firstName = req.data.first_name;
    var lastName = req.data.last_name;
    var email = req.body.email;
    var org = req.body.organization;
    var vip = req.body.vip;
    // checked_in will be happening on a differnet api call

    db.Guests.update(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        organization: org,
        vip: vip
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
    //   need to write this
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
