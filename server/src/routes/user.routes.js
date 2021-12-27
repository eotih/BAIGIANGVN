const express = require('express');
const router = express.Router();
const { generateToken, isAdmin, isAuthenticated } = require('../utils/auth');
const { show, getById, updateProfile, deleteUser, updatePassword } = require('../controllers/user.controller');

router.get('/', isAuthenticated, isAdmin, show)
router.get('/:id', isAuthenticated, isAdmin, getById)
router.put('/:id', isAuthenticated, updateProfile)
router.put('/password/:id', isAuthenticated, updatePassword)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)


module.exports = router