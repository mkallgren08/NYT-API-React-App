const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    headline: "Irma Grazes Puerto Rico but Lays Bare an Infrastructure Problem",
    byline: "By LUIS FERRÉ-SADURNÍ",
    snippet: "While the island was spared the worst of the storm, widespread power failures raised questions about its future viability.",
    link: "https://www.nytimes.com/2017/09/10/us/irma-puerto-rico-infrastructure.html",
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
