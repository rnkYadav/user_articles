const { getData, saveData, getSingleData, updateById } = require("../Model");

class Article {
  getArticles = async function (req, res) {
    try {
      let { _id } = req.params;
      let condition = {
        isActive: true,
      };
      let articles;
      if (_id) {
        Object.assign(condition, { _id: _id });
        articles = await getSingleData("Article", condition);
      } else {
        articles = await getData("Article", condition);
      }
      return res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  saveArticle = async function (req, res) {
    try {
      req.body.userId = req.user._id;
      const savedArticle = await saveData("Article", req.body);
      return res.status(200).json({
        success: true,
        data: savedArticle,
        message: "Article created successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  validateArticleOwner = async function (req, res, next) {
    try {
      const article = await getSingleData(
        "Article",
        new ObjectId(req.params._id),
        { userId: 1 }
      );
      if (!article?._id) throw Error("Article not found for this id");
      // Check if user is owner of article
      if (article.userId?.toString() != req.user._id.toString())
        throw Error("Only owner of article can edit it.");
      next();
    } catch (error) {
      console.log('error: ', error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  updateArticle = async function (req, res) {
    try {
      const savedArticle = await updateById(
        "Article",
        new ObjectId(req.params._id),
        req.body
      );
      console.log("savedArticle: ", savedArticle);
      return res.status(200).json({
        success: true,
        data: savedArticle,
        message: "Article updated successfully.",
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  deleteArticle = async function (req, res) {
    try {
      let { _id } = req.params;
      await updateById("Article", _id, {
        isActive: false,
        modifiedAt: new Date(),
      });
      return res.status(200).json({
        success: true,
        message: "Article deleted successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports.Article = new Article();
