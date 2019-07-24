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
mongoose.connect("mongodb://localhost/scraperHomework", { useNewUrlParser: true });

app.get("/all", (req, res) => {
  axios.get("https://www.theverge.com/").then((response) => {
    var $ = cheerio.load(response.data);
    $("h2.c-entry-box--compact__title").each((i, element) => {
      var result = {};
      result.title = $(element).children().text();
      result.link = $(element).find("a").attr("href");

      db.Article.create(result).then((dbArticle) => {
        console.log(dbArticle);
      })
        .catch((err) => {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});


app.get("/articles", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  // Find all Notes
  db.Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.json(articles);
    }
  })
});

app.get("/articles/:id", function (req, res) {

  return db.Article.findOne({ _id: req.params.id }).populate("note").then((dbArticles) => {

    res.json(dbArticles);
  })
});
app.post("/articles/:id", function (req, res) {
  db.Note.create(req.body).then((dbNote) => {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
  })
});

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});
