const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated } = require("../utils/auth");
const {
  show,
  getById,
  update,
  deleteBank,
  create,
} = require("../controllers/bank.controller");

router.get("/", isAuthenticated, show);
router.get("/:id", isAuthenticated, isAdmin, getById);
router.post("/", isAuthenticated, isAdmin, create);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, deleteBank);

module.exports = router;
