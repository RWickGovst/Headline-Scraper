var router = require("express").Router();
var db = require("../../models");

var axios = require("axios");
var cheerio = require("cheerio");

router.get('/', (req, res) => {
    res.render("home", {db_headlines: dbArticle})
  })

  router.get("/scrape", (req, res) => {
    axios.get("https://www.theverge.com/").then((response) => {
      var $ = cheerio.load(response.data);
      $("h2.c-entry-box--compact__title").each((i, element) => {
        
        var result = {};
        result.title = $(element).children().text();
        result.link = $(element).find("a").attr("href");
        result.summary = $(element).find("a").text();
        result.saved = false;
  
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