var router = require("express").Router();
var db = require("../../models");

//already at /articles
router.get("/", (req, res) => {
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

  // this is effectively /articles/:id
  router.get("/:id", (req, res) => {

    return db.Article.findOne({ _id: req.params.id }).populate("note").then((dbArticles) => {
  
      res.json(dbArticles);
    })
  });
  router.post("/:id", (req, res) => {
    db.Note.create(req.body).then((dbNote) => {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
    })
  });

  module.exports = router;
  
  