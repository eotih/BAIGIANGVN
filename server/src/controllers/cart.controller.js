const Cart = require("../models/cart.models");
const Combo = require("../models/combo.models");
const Lesson = require("../models/lesson.models");
const { getPrice } = require("../utils/math");
class CartController {
  // [GET] /cart
  show(req, res, next) {
    Cart.find()
      .sort({ createdAt: -1 })
      .populate("combo")
      .populate("lessons")
      .populate("user")
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch(next);
  }
  //[POST] /cart
  async create(req, res, next) {
    const { combos, lessons } = req.body;
    const lesson = await Lesson.find({ _id: { $in: lessons } });
    const combo = await Combo.find({ _id: { $in: combos } });
    const comboPrice = getPrice(combo);
    const lessonPrice = getPrice(lesson);
    const totalPrice = comboPrice + lessonPrice;
    const newCart = new Cart(req.body);
    newCart.totalPrice = totalPrice;
    try {
      const savedCart = await newCart.save();
      res.status(200).json({ message: "Cart created successfully", cart: savedCart, status: 200 });
    }
    catch (err) {
      res.status(500).json({ message: err, status: 500 });
    }

  }
  // [PUT] /cart/:id
  async update(req, res, next) {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      res.status(404).json({
        message: "Cart not found",
        status: 404
      });
    }
    const { combos, lessons } = req.body;
    const lesson = await Lesson.find({ _id: { $in: lessons } });
    const combo = await Combo.find({ _id: { $in: combos } });
    const comboPrice = getPrice(combo);
    const lessonPrice = getPrice(lesson);
    const totalPrice = comboPrice + lessonPrice;
    cart.lessons = lessons;
    cart.combos = combos;
    cart.totalPrice = totalPrice;
    cart
      .save()
      .then((updatedCart) => {
        if (updatedCart) {
          res.status(200).json({ message: "Cart updated successfully", cart: updatedCart, status: 200 });
        }
        else {
          res.status(400).json({ message: "Cart not updated", status: 400 });
        }
      })
      .catch(next);

  }
  // [DELETE] /cart/:id
  async deleteCart(req, res, next) {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      const deleteCart = await cart.remove();
      res.status(200).json({ message: "Cart Deleted", cart: deleteCart, status: 200 });
    } else {
      res.status(404).json({ message: "Cart not found", status: 404 });
    }
  }
  // [GET] /combo/:id
  getById(req, res, next) {
    Cart.findById(req.params.id)
      .populate("combo")
      .populate("lessons")
      .populate("user")
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch(next);
  }
}
module.exports = new CartController();
