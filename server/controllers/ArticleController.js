const Article = require("../models/Article");
const asyncHandler = require("express-async-handler");

const createNewArticle = asyncHandler(async (req, res) => {
  const { title, source, author, publishedDate, url, tags, summary } = req.body;
  const newArticle = new Article({
    title,
    source,
    author,
    publishedDate,
    url,
    tags,
    summary,
  });
  const savedArticle = await newArticle.save();
  res.status(201).json(savedArticle);
});

const getAllArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await Article.find({}).sort({publishedDate:-1}) ;
    if (!articles) {
      return res.status(404).json({ message: "No articles found" });
    }
    res.json(articles);
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Server error" });
  }
});

const deleteAllArticles = asyncHandler(async (req, res) => {
  try {
    await Article.deleteMany();
    res.status(200).send({ message: "All articles deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting articles", error });
  }
});

module.exports = {
  createNewArticle,
  getAllArticles,
  deleteAllArticles
};
