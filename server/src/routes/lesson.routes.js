const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const { show, getById,getByWeek, create, update, deleteLesson } = require('../controllers/lesson.controller');

router.get('/', isAuthenticated, show)
router.get('/week/:id', isAuthenticated, getByWeek)
router.get('/:id', isAuthenticated, getById)
router.post('/', isAuthenticated, isAdmin, create)
router.put('/:id', isAuthenticated, isAdmin, update)
router.delete('/:id', isAuthenticated, isAdmin, deleteLesson)


module.exports = router