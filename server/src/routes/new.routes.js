const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const { show, getById, create, update, deleteNew } = require('../controllers/new.controller');

router.get('/', isAuthenticated, show)
router.get('/:id', isAuthenticated, getById)
router.post('/', isAuthenticated, isAdmin, create)
router.put('/:id', isAuthenticated, isAdmin, update)
router.delete('/:id', isAuthenticated, isAdmin, deleteNew)


module.exports = router