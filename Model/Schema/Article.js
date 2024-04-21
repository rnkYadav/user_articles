const mongoose = require("mongoose");

const Article_Schema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  title: { type: String, required: [true, "Article title is required"] },
  description: {
    type: String,
    required: [true, "Article description is required"],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: [true, "Article user Id is required"] },
  modifiedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
});

const Article = mongoose.model("Article", Article_Schema);

module.exports = Article;
