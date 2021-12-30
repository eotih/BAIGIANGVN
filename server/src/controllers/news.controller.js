const News = require("../models/news.models");
var formidable = require("formidable");
const fs = require("fs");
class NewController {
  // [GET] /News
  show(req, res, next) {
    News.find()
      .sort({ createdAt: -1 })
      .then((news) => {
        if (news) {
          res.status(200).json(News);
        } else {
          res.status(404).json({
            message: "News not found",
          });
        }
      })
      .catch(next);
  }
  // [POST] /News
  async create(req, res, next) {
    const { title, description, image, link } = req.body;
    await News.findOne({ title: title })
      .then((news) => {
        if (news) {
          res.status(400).json({
            message: "News already exists",
          });
        } else {
          const newNews = new News({
            user: req.user._id,
            title: title,
            description: description,
            image: image,
            link: link,
          });
          newNews
            .save()
            .then((news) => {
              res.status(201).json(news);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  // [PUT] /News/:id
  update(req, res, next) {
    const { title, description, image, link } = req.body;
    News.findById(req.params.id)
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          news.title = title;
          news.description = description;
          news.image = image;
          news.link = link;
          news
            .save()
            .then((news) => {
              res.status(200).json(news);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  // [DELETE] /News/:id
  deleteNews(req, res, next) {
    News.findByIdAndDelete(req.params.id)
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          res.status(200).json({
            message: "Delete success",
          });
        }
      })
      .catch(next);
  }
  // [GET] /News/:id
  getById(req, res, next) {
    News.findById(req.params.id)
      .sort({ createdAt: -1 })
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          res.json(news);
        }
      })
      .catch(next);
  }
  get5News(req, res, next) {
    News.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          res.json(news);
        }
      })
      .catch(next);
  }
}
module.exports = new NewController();
