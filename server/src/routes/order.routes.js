const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const {show, getByUserId, getById, create, pay, deleteOrder} = require('../controllers/order.controller');

router.get('/', isAuthenticated, isAdmin, show)
router.get('/:id', isAuthenticated, getById)
router.put('/user/:id', isAuthenticated, getByUserId)
router.post('/:id', isAuthenticated, create)
router.put('/:id/pay', isAuthenticated, pay)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)


module.exports = router