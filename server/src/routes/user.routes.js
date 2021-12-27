const express = require('express');
const router = express.Router();
const { generateToken, isAdmin, isAuthenticated } = require('../utils/auth');
const UserController = require('../controllers/user.controller');

router.get('/', isAuthenticated, isAdmin, UserController.show)
router.get('/:id', isAuthenticated, isAdmin, UserController.getById)
router.post('/:id', isAuthenticated, isAdmin, UserController.create)
router.put('/:id', isAuthenticated, isAdmin, UserController.update)
router.delete('/:id', isAuthenticated, isAdmin, UserController.delete)


module.exports = router