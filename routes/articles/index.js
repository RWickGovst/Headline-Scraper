var router = require("express").Router();
var db = require("../../models");
router.get("/", function(req, res){
  console.log("home route");
  //res.redirect("/articles");
  res.render("home");
})

//already at /articles
router.get("/articles", function(req, res) {

    // TODO: Finish the route so it grabs all of the articles
    // Find all Notes
    return db.Article.find({}, function (err, articles) {
      if (err) {
        console.log(err);
      } else {
      
      res.json(articles);
    }
    });
});

  // this is effectively /articles/:id
  router.get("/:id", function (req, res) {

    return db.Article.findOne({ _id: req.params.id }).populate("note").then, function(dbArticles) {
  
      res.json(dbArticles);
    }
  });
  router.post("/:id", function (req, res) {
    db.Note.create(req.body).then, function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
    }
  });

  module.exports = router;
  
  