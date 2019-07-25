var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var routes = require("./routes");

var PORT = 3000;

// Initialize Express
var app = express();
app.engine("handlebars", exphbs({default: "main"}));
app.set("view engine", "handlebars");

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

  // Listen on port 3000
  app.listen(3000, function () {
    console.log("App running on port 3000!");
  });


