require("dotenv").config();
var express = require("express");
var Mailgun = require("mailgun-js");
var app = express();

var db = require("../models");

module.exports = function(app) {
  var api_key = process.env.API_ID;
  var domain = process.env.DOMAIN;
  var from_who = process.env.EMAIL;

  // CHECKIN
  // button click will send the invitation email (wrap in a function)
  app.get("/api/guest/checkin/:id", function(req, res) {
    console.log("started the mail for check in process");
    db.Guests.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(gus) {
      var thisEvent = gus.EventId;

      db.Events.findOne({
        where: {
          id: thisEvent
        }
      }).then(function(eve) {
        var checkInObj = {
          eventName: eve.name,
          question1: eve.question1,
          question2: eve.question2,
          question3: eve.question3,
          firstName: gus.first_name,
          email: gus.email
        };
        console.log("SENDMAIL OBJECT");
        console.log(checkInObj);

        var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

        var data = {
          from: from_who,
          to: checkInObj.email,
          subject: "You've been checked in!",
          html:
            "<H1>Welcome to the" +
            eventName +
            ", " +
            checkInObj.firstName +
            "!</h1>" +
            "<p>We are so glad you are here with us</p>" +
            "<p>Get started with:</p>" +
            "<ol>" +
            "<li>" +
            question1 +
            "</li>" +
            "<li>" +
            question2 +
            "</li>" +
            "<li>" +
            question3 +
            "</li>" +
            "</ol>" +
            "<p>If you have any questions alon the way, let us know</p>" +
            "<p>Enjoy!</p>"
        };

        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data, function(err, body) {
          //If there is an error, render the error page
          if (err) {
            res.render("error", { error: err });
            console.log("got an error: ", err);
          }
          //Else we can greet and leave
          else {
            console.log("sending mailgun messgae");
            console.log(body);
          }
        });
      });
    });
  });

  // INVITATION
  app.get("/api/guest/invite/:mail/:event", function(req, res) {
    console.log("SENDING INVITE");
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
    db.Events.findOne({
      where: {
        id: req.params.event
      }
    }).then(function(eve) {
      var eventObj = {
        name: eve.name,
        description: eve.description,
        start_time: eve.start_time,
        end_time: eve.end_time,
        date: eve.date,
        address_line: eve.address_line,
        city: eve.city,
        state: eve.state,
        zipcode: eve.zipcode
      };

      var data = {
        from: from_who,
        to: req.params.mail,
        subject: "You're invited!",
        html:
          "<H1>You're invited!</h1>" +
          "<p>Join us for the: " +
          eventObj.name +
          "<p>Details: </p>" +
          "<ul>" +
          "<li>Date: " +
          eventObj.date +
          "</li>" +
          "<li>Location: " +
          eventObj.address_line +
          " " +
          eventObj.city +
          ", " +
          eventObj.state +
          " " +
          eventObj.zipcode +
          "</li>" +
          "<li>From: " +
          eventObj.start_time +
          " to " +
          eventObj.end_time +
          "</li>" +
          "<ul>" +
          "<p>See you there!</p>"
      };

      mailgun.messages().send(data, function(err, body) {
        //If there is an error, render the error page
        if (err) {
          res.render("error", { error: err });
          console.log("got an error: ", err);
        }
        //Else we can greet and leave
        else {
          console.log("sending mailgun messgae");
          // this is where the page will be updated with an email being sent
          // res.render("handlebarspage....", { status: "invite sent" });
          console.log(body);
        }
      });
    });
  });
}; // end of export
