const Combo = require("../models/combo.models");
const Lesson = require("../models/lesson.models");

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
    const { name, price, image, description, lessons } = req.body;
    if (!name || !image || !description || !lessons) {
      res.status(400).json({
        message: "Please provide all the required fields",
        status: 400
      });
    } else {
      const lesson = await Lesson.find({ _id: { $in: lessons } });
      const perLesson = lesson.map(lesson => lesson.price);
      const totalPrice = perLesson.reduce((a, b) => a + b, 0);
      const newCombo = new Combo(req.body);
      newCombo.price = totalPrice;
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
  update(req, res, next) {
    Combo.findById(req.params.id)
      .then((combo) => {
        if (!combo) {
          res.status(404).json({
            message: "Combo not found",
            status: 404
          });
        } else {
          const { name, price, image, description, lessons } = req.body;
          if (!name || !price || !image || !description || !lessons) {
            res.status(400).json({
              message: "Please provide all the required fields",
              status: 400
            });
          } else {
            combo.name = name;
            combo.price = price;
            combo.image = image;
            combo.description = description;
            combo.lessons = lessons;
            Combo
              .save()
              .then((updatedCombo) => {
                if (updatedCombo) {
                  res.status(200).json({ message: "Combo updated successfully", combo: updatedCombo, status: 200 });
                }
                else {
                  res.status(400).json({ message: "Combo not updated", status: 400 });
                }
              })
              .catch(next);
          }
        }
      })
      .catch(next);
  }
  // [DELETE] /combo/:id
  async deleteCombo(req, res, next) {
    const Combo = await Combo.findById(req.params.id);
    if (Combo) {
      const deleteCombo = await Combo.remove();
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
        res.status(200).json(Combo);
      })
      .catch(next);
  }
}
module.exports = new ComboController();
