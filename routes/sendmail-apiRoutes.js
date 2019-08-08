require("dotenv").config();
var express = require("express");
var Mailgun = require("mailgun-js");
var app = express();

var db = require("../models");

module.exports = function(app) {
  console.log("++++++++++++++++++++++++++++++++++ mailgun");

  var api_key = process.env.API_ID;
  var domain = process.env.DOMAIN;
  var from_who = process.env.EMAIL;

  // CHECKIN
  // button click will send the invitation email (wrap in a function)
  app.get("/api/guest/checkin/:id", function(req, res) {
    db.Guests.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      var checkinObj = {
        // eventID: result.EventId,
        firsName: result.first_name,
        email: result.email
      };
      return checkinObj.get();
    });

    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
    // var question1 = "question1";
    // var question2 = "question2";
    // var question3 = "question3";

    var data = {
      from: from_who,
      to: checkinObj.email,
      subject: "You've been checked in!",
      html:
        "<H1>Welcome to the" +
        eventName +
        ", " +
        checkinObj.firstName +
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
        // this is where the page will be updated with an email being sent
        // res.render("handlebarspage....", { status: "invite sent" });
        console.log(body);
      }
    });
  });

  // INVITATION
  app.get("/api/guest/invite/:mail", function(req, res) {
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

    var eventName = "Event";
    var location = "";
    var startTime = "";
    var endTime = "";
    var date = "";

    var data = {
      from: from_who,
      to: req.params.mail,
      subject: "You're invited!",
      html:
        "<H1>You're invited!</h1>" +
        "<p>Join us for the: " +
        eventName +
        "<p>Details: </p>" +
        "<ul>" +
        "<li>Date: " +
        date +
        "</li>" +
        "<li>Location: " +
        location +
        "</li>" +
        "<li>From: " +
        startTime +
        " to " +
        endTime +
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
}; // end of export
