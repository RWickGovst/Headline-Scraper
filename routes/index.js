var router = require("express").Router();
var articles = require("./articles");
var viewRoutes = require("./view");

router.use("/articles", articles);
router.use("/", viewRoutes);

module.exports = router;