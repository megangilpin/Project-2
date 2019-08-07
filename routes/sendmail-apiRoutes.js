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

  // button click will send the invitation email (wrap in a function)
  app.get("/api/submit/:mail", function(req, res) {
    console.log("in the snedmail js");
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

    var data = {
      from: from_who,
      to: req.params.mail,
      subject: "You've been checked in!",
      html:
        'Hello, This is not a plain-text email. <a href="http://0.0.0.0:3030/validate?' +
        req.params.mail +
        ". This is who sent the email." +
        from_who
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
        // res.render("guests", { status: "invite sent" });
        res.html("success");
        console.log(body);
      }
    });
  });
}; // end of export
