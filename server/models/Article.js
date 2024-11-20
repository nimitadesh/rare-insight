const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  source: {
    type: String,
  },
  author: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  url: {
    type: String,
  },
  tags: {
    type: String,
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model("Article", articleSchema);
