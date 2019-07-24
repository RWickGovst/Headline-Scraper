var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.get("/all", (req, res) => {
  axios.get("https://www.theverge.com/").then ((response) => {
    var $ = cheerio.load(response.data);
      $("article h2").each((i, element) => {
        var result = {}
        result.title = $(this)
          .children("a").text();
        result.link = $(this)
          .children("a").attr("href");

          db.Article.create(result).then ((dbArticle) => {
            console.log(dbArticle);
          })
          .catch((err) => {
            console.log(err);
          });
      });
     res.send("Scrape Complete");
  });
});


app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
    // Find all Notes
    db.Article.find({}, (err, articles) =>{
      if(err) {
        console.log(err);
      }else {
        res.json(articles);
      }
    })
});

app.get("/articles/:id", function(req, res) {

  db.Article.findOne({_id: req.params.id}).populate("note").then((dbArticles) => {
    
    res.json(dbArticles);
  
})
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
