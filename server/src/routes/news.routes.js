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
  restore,
  destroy,
} = require("../controllers/news.controller");

router.get("/", isAuthenticated, show);
router.get("/newest", isAuthenticated, get5News);
router.get("/:id", isAuthenticated, getById);
router.post("/", isAuthenticated, isAdmin, create);
router.put('/:id/restore', restore)
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, deleteNews);
router.delete("/:id/delete", isAuthenticated, isAdmin, destroy);

module.exports = router;
