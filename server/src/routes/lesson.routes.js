const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const LessonController = require('../controllers/user.controller');

router.get('/', isAuthenticated, LessonController.show)
router.get('/:id', isAuthenticated, LessonController.getById)
router.post('/:id', isAuthenticated, isAdmin, LessonController.create)
router.put('/:id', isAuthenticated, isAdmin, LessonController.update)
router.delete('/:id', isAuthenticated, isAdmin, LessonController.delete)


module.exports = router