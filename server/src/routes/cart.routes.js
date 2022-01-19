const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/auth");
const {
  show,
  getById,
  addOrUpdate,
  deleteCart,
} = require("../controllers/cart.controller");

router.get("/", isAuthenticated, show);
router.get("/:id", isAuthenticated, getById);
router.post("/", isAuthenticated, addOrUpdate);
router.delete("/:id", isAuthenticated, deleteCart);

module.exports = router;
