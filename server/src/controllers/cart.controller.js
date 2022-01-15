const Cart = require("../models/cart.models");
const Combo = require("../models/combo.models");
const Lesson = require("../models/lesson.models");
const { getPrice } = require("../utils/math");
class CartController {
  // [GET] /cart
  show(req, res, next) {
    Cart.findOne({user: req.user._id})
      .sort({ createdAt: -1 })
      .populate("combos")
      .populate("lessons")
      .populate("user")
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch(next);
  }
  // [POST] /cart
  async addOrUpdate(req, res, next) {
    let checkExistLesson = [];
    let checkExistCombo = [];
    const { combos, lessons } = req.body;
    const lesson = await Lesson.find({ _id: { $in: lessons } });
    const combo = await Combo.find({ _id: { $in: combos } });
    const comboPrice = getPrice(combo);
    const lessonPrice = getPrice(lesson);
    const totalPrice = comboPrice + lessonPrice;
    // check in Cart exist or not req.user
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const newCart = new Cart({
        user: req.user._id,
        lessons,
        combos,
      });
      newCart.totalPrice = totalPrice;
      try {
        const savedCart = await newCart.save();
        res.status(200).json({ message: "Cart created successfully", createdCart: savedCart, status: 200 });
      }
      catch (err) {
        res.status(500).json({ message: err, status: 500 });
      }
    } else {
      // check in cart exist that lesson or combo id 
      if(combos && cart.combos){
        checkExistCombo = cart.combos.filter((combo) => combos.includes(combo._id));
      }
      if(lessons && cart.lessons){
        checkExistLesson = cart.lessons.filter((lesson) => lessons.includes(lesson._id));
      }
      if (checkExistLesson.length > 0 || checkExistCombo.length > 0) {
        res.status(400).json({ message: "Lesson or combo already exist in cart", status: 400 });
      } else {
        cart.lessons = cart.lessons.concat(lessons);
        cart.combos = cart.combos.concat(combos);
        cart.totalPrice = totalPrice;
        try {
          const savedCart = await cart.save();
          res.status(200).json({ message: "Cart updated successfully", updatedCart: savedCart, status: 200 });
        }
        catch (err) {
          res.status(500).json({ message: err, status: 500 });
        }
      }
    }
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
