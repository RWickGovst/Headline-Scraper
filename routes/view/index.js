var router = require("express").Router();
var db = require("../../models");

var axios = require("axios");
var cheerio = require("cheerio");

router.get('/', function(req, res) {
    res.render("home", {db_headlines: dbArticle})
  })

  router.get("/scrape", (req, res) => {
    axios.get("https://www.theverge.com/").then, function(response) {
      var $ = cheerio.load(response.data);
      $("h2.c-entry-box--compact__title").each, function(i, element) {
        
        var result = {};
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