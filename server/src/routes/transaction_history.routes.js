const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated } = require("../utils/auth");
const {
  show,
  getById,
  // update,
  deleteTransactionHistory,
  create,
} = require("../controllers/transaction_history.controller");

router.get("/", isAuthenticated, isAdmin, show);
router.get("/:slug", isAuthenticated, getById);
router.post("/", isAuthenticated, isAdmin, create);
// router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, deleteTransactionHistory);

module.exports = router;
