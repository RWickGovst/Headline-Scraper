var express = require("express");
var router = require("express").Router();
var db = require("../../models");

var axios = require("axios");
var cheerio = require("cheerio");
var app = express();
// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var articles = {};

router.get('/', function(req, res) {
    res.render("home", {db_headlines: articles})
    // .catch, function(err) {
    //   console.log(err);
    // };
  })

  router.get("/scrape", function(req, res) {
    axios.get("https://www.theverge.com/").then, function(response) {
      var $ = cheerio.load(response.data);
      $("h2.c-entry-box--compact__title").each, function(i, element) {
        
        var result = {};
        // console.log(result);

        result.title = $(element).children().text();
        result.link = $(element).find("a").attr("href");
        result.summary = $(element).find("a").text();
        result.saved = false;
  
        db.Article.create(result).then, function(dbArticle) {
          console.log(dbArticle);
          }
          .catch, function(err) {
            console.log(err);
          };
      };
      res.send("Scrape Complete");
    };
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

  module.exports = router;
  