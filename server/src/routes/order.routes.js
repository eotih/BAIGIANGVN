const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const {show, getByUserId, getById, create, deleteOrder} = require('../controllers/order.controller');

router.get('/', isAuthenticated, isAdmin, show)
router.get('/:id', isAuthenticated, getById)
router.post('/', isAuthenticated, create)
router.get('/user/:id', isAuthenticated, getByUserId)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)


module.exports = router