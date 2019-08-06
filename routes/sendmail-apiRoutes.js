require("dotenv").config();
var express = require("express");
var Mailgun = require("mailgun-js");
var app = express();

var db = require("../models");

module.exports = function() {
  console.log("++++++++++++++++++++++++++++++++++ mailgun");

  var api_key = process.env.API_ID;
  var domain = process.env.DOMAIN;
  var from_who = process.env.EMAIL;

  // Send a message to the specified email address when you navigate to /submit/someaddr@email.com
  // The index redirects here
  app.get("/api/submit/:mail", function(req, res) {
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

    var data = {
      //Specify email data
      from: from_who,
      //The email to contact
      to: req.params.mail,
      //Subject and text data
      subject: "You've been checked in for " + "ENTER EVENT NAME",
      html:
      "Welcome to the EVENT NAME"
        "Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href=\"http://0.0.0.0:3030/validate?" +
        req.params.mail +
        "\">Click here to add your email address to a mailing list</a>"
    };

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function(err, body) {
      //If there is an error, render the error page
      if (err) {
        res.render("error", { error: err });
        console.log("got an error: ", err);
      }
      //Else we can greet    and leave
      else {
        res.render("guests", { status: "invite sent" });
        console.log(body);
      }
    });
  });
}; // end of export
