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