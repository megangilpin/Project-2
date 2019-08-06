require("dotenv").config();
var http = require('http'); 
var express = require("express");
var exphbs = require("express-handlebars");

// added this for mailgun testing - leave this hear for now (signed, Emily)
// var sendmail = require("./public/js/sendmail");
// sendmail();

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/guest-apiRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/user-apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// have set this to TRUE so that the Sequelize will run during development (need to change back to FALSE later)
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
