const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const { show, getByUserId, getById, create, deleteOrder, updateState } = require('../controllers/order.controller');

router.get('/', isAuthenticated, isAdmin, show)
router.get('/user', isAuthenticated, getByUserId)
router.get('/:id', isAuthenticated, getById)
router.put('/:id', isAuthenticated, updateState)
router.post('/', isAuthenticated, create)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)


module.exports = router