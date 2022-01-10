const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated } = require("../utils/auth");
const {
  show,
  getById,
  update,
  deleteCombo,
  create,
} = require("../controllers/combo.controller");

router.get("/", isAuthenticated, show);
router.get("/:id", isAuthenticated, getById);
router.post("/", isAuthenticated, isAdmin, create);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, deleteCombo);

module.exports = router;
