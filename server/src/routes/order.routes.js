const express = require('express');
const router = express.Router();
const { isAdmin, isAuthenticated } = require('../utils/auth');
const OrderController = require('../controllers/order.controller');

router.get('/', isAuthenticated, isAdmin, OrderController.show)
router.get('/:id', isAuthenticated, OrderController.getById)
router.post('/:id', isAuthenticated, OrderController.create)
router.put('/:id/pay', isAuthenticated, OrderController.pay)
router.delete('/:id', isAuthenticated, isAdmin, OrderController.delete)


module.exports = router