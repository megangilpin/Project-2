var db = require("../models");

module.exports = function(app) {
  // Get all events with details for that particular admin
  app.get("/api/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Create a new event
  app.post("/api/events", function(req, res) {
    db.Events.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Update event details.
  app.put("/api/events", function(req, res) {
    db.Events.update(
      {
        name: req.body.name,
        description: req.body.description,
        eventType: req.body.eventType,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        addressLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Delete an event by id
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
};
