const Combo = require("../models/combo.models");
const Lesson = require("../models/lesson.models");
const { getPriceCombos } = require("../utils/math")
class ComboController {
  // [GET] /combo
  show(req, res, next) {
    Combo.find()
      .sort({ createdAt: -1 })
      .populate("lessons")
      .then((combo) => {
        res.status(200).json(combo);
      })
      .catch(next);
  }
  //[POST] /combo
  async create(req, res, next) {
    const { name, image, description, lessons, sale } = req.body;
    if (!name || !image || !description || !lessons || !sale) {
      res.status(400).json({
        message: "Please provide all the required fields",
        status: 400
      });
    } else {
      const lesson = await Lesson.find({ _id: { $in: lessons } });
      const lessonPrice = getPriceCombos(lesson);
      const newCombo = new Combo(req.body);
      newCombo.price = lessonPrice;
      try {
        const savedCombo = await newCombo.save();
        res.status(200).json({ message: "Combo created successfully", combo: savedCombo, status: 200 });
      }
      catch (err) {
        res.status(500).json({ message: err, status: 500 });
      }
    }
  }
  // [PUT] /combo/:id
  async update(req, res, next) {
    Combo.findById(req.params.id)
      .then((combo) => {
        if (!combo) {
          res.status(404).json({
            message: "Combo not found",
            status: 404
          });
        } else {
          const { name, image, description, lessons, sale } = req.body;
          if (!name || !image || !description || !lessons) {
            res.status(400).json({
              message: "Please provide all the required fields",
              status: 400
            });
          } else {
            Lesson.find({ _id: { $in: lessons } })
              .then((lesson) => {
                const lessonPrice = getPrice(lesson);
                combo.name = name;
                combo.image = image;
                combo.description = description;
                combo.lessons = lessons;
                combo.price = lessonPrice;
                combo.sale = sale;
                combo
                  .save()
                  .then((updatedCombo) => {
                    if (updatedCombo) {
                      res.status(200).json({ message: "Combo updated successfully", combo: updatedCombo, status: 200 });
                    }
                    else {
                      res.status(400).json({ message: "Combo not updated", status: 400 });
                    }
                  })
              })
              .catch(next);

          }
        }
      })
      .catch(next);
  }
  // [DELETE] /combo/:id
  async deleteCombo(req, res, next) {
    const combo = await Combo.findById(req.params.id);
    if (combo) {
      const deleteCombo = await combo.remove();
      res.status(200).json({ message: "Combo Deleted", combo: deleteCombo, status: 200 });
    } else {
      res.status(404).json({ message: "Combo not found", status: 404 });
    }
  }
  // [GET] /combo/:id
  getById(req, res, next) {
    Combo.findById(req.params.id)
      .populate("lessons")
      .then((combo) => {
        res.status(200).json(combo);
      })
      .catch(next);
  }
}
module.exports = new ComboController();
