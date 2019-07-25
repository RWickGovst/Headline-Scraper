var router = require("express").Router();
var articles = require("/articles");
var scrape = require("/scrape");
var viewRoutes = require("/view");

router.use("/articles", articles);
router.use("/scrape", scrape);
router.use("/", viewRoutes);

module.exports = router;