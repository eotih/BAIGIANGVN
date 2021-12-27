const express = require('express');
const router = express.Router();
const { generateToken, isAdmin, isAuthenticated } = require('../utils/auth');
const { show, getById, update, deleteUser } = require('../controllers/user.controller');

router.get('/', isAuthenticated, isAdmin, show)
router.get('/:id', isAuthenticated, isAdmin, getById)
router.put('/:id', isAuthenticated, isAdmin, update)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)


module.exports = router