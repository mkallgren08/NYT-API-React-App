const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true},
  byline: { type: String },
  snippet: {type: String},
  link: {type: String}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
