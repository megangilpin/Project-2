require("dotenv").config();

module.exports = function() {

    const mailgun = require("mailgun-js");
    const api_key = process.env.API_ID;

    const DOMAIN = process.env.DOMAIN;
    console.log("+++++++++++++++++++++++++++ mailgun is sending");

    const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
    const data = {
        from: 'GuestLister <guestlister.app@gmail.com>',
        to: 'guestlister.app@gmail.com,elyzableau.om@gmail.com',
        subject: 'another test',
        text: 'Testing!'
        // TO DO: include add to calendar link 
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}



// BELOW FROM MAILGUN WEBSITE

//We're using the express framework and the mailgun-js wrapper
var express = require("express");
var Mailgun = require("mailgun-js");
//init express
var app = express();
//Your api key, from Mailgun’s Control Panel
var api_key = "MAILGUN-API-KEY";
//Your domain, from the Mailgun Control Panel
var domain = "YOUR-DOMAIN.com";
//Your sending email address
var from_who = "your@email.com";
//Tell express to fetch files from the /js directory
app.use(express.static(__dirname + "/js"));
//We're using the Jade templating language because it's fast and neat
app.set("view engine", "jade");
//Do something when you're landing on the first page
app.get("/", function (req, res) {
    //render the index.jade file - input forms for humans
    res.render("index", function (err, html) {
        if (err) {
            // log any error to the console for debug
            console.log(err);
        } else {
            //no error, so send the html to the browser
            res.send(html);
        }
    });
});
// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
app.get("/submit/:mail", function (req, res) {
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
    var data = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: req.params.mail,
        //Subject and text data
        subject: "Hello from Mailgun",
        html:
            "Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href=\"http://0.0.0.0:3030/validate?" +
            req.params.mail +
            "\">Click here to add your email address to a mailing list</a>"
    };
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render("error", { error: err });
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.render("submitted", { email: req.params.mail });
            console.log(body);
        }
    });
});
