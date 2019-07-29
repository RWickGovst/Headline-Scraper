var express = require("express");
// var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperHomework";
mongoose.connect(MONGODB_URI);

var PORT = 3000;

// Initialize Express
var app = express();
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
var routes = require("./routes");
app.use(routes);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperHomework", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log("Connected to MongoDb");
});

  // Listen on port 3000
  app.listen(PORT, function () {
    console.log("App running on port 3000!");
    console.log(`check it at http://localhost:${PORT}`);
  });
// Connect to the Mongo DB


