const express = require("express");
const { Article } = require("../Controller/Article");
const Auth = require("../Controller/Auth");
const router = express.Router();

router.post("/create", Auth.authenticateUser, Article.saveArticle);
router.get("/list", Auth.verifyRequest, Article.getArticles);
router.get("/:_id", Auth.verifyRequest, Article.getArticles);
router.put(
  "/update/:_id",
  Auth.authenticateUser,
  Article.validateArticleOwner,
  Article.updateArticle
);
router.delete(
  "/delete/:_id",
  Auth.authenticateUser,
  Article.validateArticleOwner,
  Article.deleteArticle
);

module.exports = router;
