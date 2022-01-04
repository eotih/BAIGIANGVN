const News = require("../models/news.models");
class NewController {
  // [GET] /News
  async show(req, res, next) {
    await News.findWithDeleted()
      //populate with many info
      .populate("user", { name: 1, image: 1 })  //populate with one info
      .sort({ createdAt: -1 })
      .then((news) => {
        if (news) {
          res.status(200).json(news);
        } else {
          res.status(404).json({
            message: "News not found",
          });
        }
      })
      .catch(next);
  }
  async destroy(req, res, next) {
    const news = await News.findWithDeleted(req.params.id);
    if (news) {
      await News.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'News Deleted' });
    } else {
      res.status(200).json({ message: 'News not found' });
    }
  }
  // [POST] /News
  async create(req, res, next) {
    const { title, description, image, category } = req.body;
    if (!title || !description || !image || !category) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }
    else {
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
              category: category,
              image: image,
            });
            newNews
              .save()
              .then((news) => {
                res.status(201).json({ message: "News created", news: news });
              })
              .catch(next);
          }
        })
        .catch(next);

    }
  }
  // [PUT] /News/:id
  async update(req, res, next) {
    const { title, description, image, link } = req.body;
    await News.findById(req.params.id)
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
              res.status(200).json({
                message: "News updated",
                news: news
              });
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  // [DELETE] /news/:id
  async deleteNews(req, res, next) {
    const news = await News.findById(req.params.id);
    if (news) {
      const deleteNews = await news.delete();
      res.status(200).json({ message: 'News Deleted', news: deleteNews });
    } else {
      res.status(200).json({ message: 'News not found' });
    }
  }
  // [PUT] /news/:id/restore
  async restore(req, res, next) {
    const news = await News.findById(req.params.id);
    if (news) {
      await News.restore({ _id: req.params.id });
      res.status(200).json({ message: 'News Restored', news: news });
    } else {
      res.status(200).json({ message: 'News not found' });
    }
  }
  // [GET] /News/:id
  async getById(req, res, next) {
    await News.findById(req.params.id)
      .sort({ createdAt: -1 })
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          res.status(200).json({ message: "News found", news: news });
        }
      })
      .catch(next);
  }
  async get5News(req, res, next) {
    await News.find()
      .populate("user", { name: 1, image: 1 })
      .sort({ createdAt: -1 })
      .limit(3)
      .then((news) => {
        if (!news) {
          res.status(404).json({
            message: "News not found",
          });
        } else {
          res.status(200).json(news);
        }
      })
      .catch(next);
  }
}
module.exports = new NewController();
