// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, results) {
    if (error) {
      console.log(error);
    }
    else {
      
      res.json(results);
    }
  });
});


app.get("https://www.theverge.com").then(function(response) {

   var $ = cheerio.load(response.data);

  
  var results = [];

   $("h2.c-entry-box--compact__title").each(function(i, element) {

    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");

    results.push({
      title: title,
      link: link
    });
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
