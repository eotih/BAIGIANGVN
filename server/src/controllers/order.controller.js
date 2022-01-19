const Order = require('../models/order.models');
const User = require('../models/user.models');
const Cart = require('../models/cart.models');

class OrderController {
    // [GET] /order
    show(req, res, next) {
        Order.find()
            .sort({ createdAt: -1 })
            .populate("combos")
            .populate("lessons")
            .populate("user", { name: 1, image: 1 })
            .then((orders) => {
                res.status(200).json(orders);
            })
            .catch(next);
    }
    // [POST] /order
    async create(req, res, next) {
        const { lessons, combos, totalPrice } = req.body;
        const user = await User.findById(req.user._id);
        const cart = await Cart.findOne({ user: req.user._id });
        if (!lessons || !combos || !totalPrice) {
            res.status(400).json({
                message: 'Missing fields',
                status: 400
            });
        } else {
            const newOrder = new Order(req.body);
            newOrder.save()
                .then((order) => {
                    if (order) {
                        user.money = Number(user.money) - Number(totalPrice);
                        user.save()
                        // delete cart from user
                        cart.remove()
                        res.status(200).json({
                            message: 'Order created successfully',
                            status: 200,
                            order
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Order not created',
                            status: 400
                        });
                    }
                })
                .catch(next);
        }

    }
    //[PUT] /order/:id
    updateState(req, res, next) {
        const { state } = req.body;
        Order.findById(req.params.id)
            .then((order) => {
                if (!order) {
                    res.status(404).json({
                        message: 'Order not found'
                    });
                } else {
                    order.state = state;
                    order.save()
                        .then((order) => {
                            if (order) {
                                res.status(200).json({
                                    message: 'Order updated successfully',
                                    status: 200,
                                    order
                                });
                            }
                            else {
                                res.status(400).json({
                                    message: 'Order not updated',
                                    status: 400
                                });
                            }
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }
    // [DELETE] /order/:id
    deleteOrder(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then((order) => {
                if (order) {
                    res.status(200).json({ message: 'Order deleted', order, status: 200 });
                }
                else {
                    res.json({ message: 'Order not found', status: 404 });
                }
            })
            .catch(next);
    }
    // [GET] /order/:id
    getById(req, res, next) {
        Order.findById(req.params.id)
            .then((order) => {
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.json({ message: 'Order not found' });
                }
            })
            .catch(next);
    }
    //[GET] /order/user
    getByUserId(req, res, next) {
        Order.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("combos")
        .populate("lessons")
        .populate("user", { name: 1, image: 1 })
            .then((orders) => {
                if (orders) {
                    res.status(200).json(orders);
                }
                else {
                    res.status(200).json({ message: 'No orders found' });
                }
            })
            .catch(next);
    }

}
module.exports = new OrderController;