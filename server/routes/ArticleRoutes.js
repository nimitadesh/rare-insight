const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/ArticleController");

router.route("/")
.get(articlesController.getAllArticles)
.post(articlesController.createNewArticle)
.delete(articlesController.deleteAllArticles);

module.exports = router;
