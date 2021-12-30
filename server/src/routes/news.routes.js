const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated } = require("../utils/auth");
const {
  show,
  getById,
  create,
  update,
  deleteNews,
  get5News,
} = require("../controllers/news.controller");

router.get("/", isAuthenticated, show);
router.get("/:id", isAuthenticated, getById);
router.get("/newest", isAuthenticated, get5News);
router.post("/", isAuthenticated, isAdmin, create);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, deleteNews);

module.exports = router;
