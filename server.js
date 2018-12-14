var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapings";

mongoose.connect(MONGODB_URI);

app.use(express.static('public'));

var databaseUri = 'mongodb://localhost/scrapings';

if (process.env.MONGODB_URI) {
mongoose.connect(process.env.MONGODB_URI);
} else {
mongoose.connect(databaseUri);
};

var db = mongoose.connection;

db.on('error', function(err) {
console.log('Mongoose Error: ', err);
});

db.once('open', function() {
console.log('Mongoose connection successful.');
});
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;





// // Routes
// // =============================================================
require("./routes/api-routes.js")(app);

// // Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
// });



mongoose.connect(db, function(error) {
  if (error) {
      return error;
  }
  else {
    console.log("Connection Success!");
  }
});

app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});