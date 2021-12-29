const Order = require('../models/order.models');
const User = require('../models/user.models');

class OrderController {
    // [GET] /orders
    show(req, res, next) {
        Order.find().sort({ createdAt: -1 })
            .then(orders => {
                if (orders) {
                    res.json(orders);
                } else {
                    res.json({ message: 'No orders found' });
                }
            })
            .catch(next);
    }
    // [POST] /orders
    async create(req, res, next) {
        const { orderItems, paymentMethod, itemsPrice, totalPrice } = req.body;
        if (orderItems.length === 0) {
            return res.status(400).json({
                message: 'Order must have at least one item'
            });
        }
        else {
            // Check if user exists and money is enough
            const user = await User.findById(user);
            if (!user) {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }
            else if (user.money < totalPrice) {
                return res.status(400).json({
                    message: 'User does not have enough money'
                });
            }
            else {
                if (orderItems.length > 0) {
                    for (let i = 0; i < orderItems.length; i++) {
                        const order = new Order({
                            orderItems: orderItems[i],
                            user: req.user._id,
                            paymentMethod: paymentMethod,
                            totalPrice: totalPrice,

                        })
                        const createdOrder = await order.save();
                        user.money -= totalPrice;
                        user.deposited += totalPrice;
                        await user.save();
                        return res.status(200).json({ message: 'Order created', order: createdOrder });
                    }
                } else {
                    return res.status(400).json({
                        message: 'Order must have at least one item'
                    });
                }
            }
        }
    }
    // [DELETE] /orders/:id
    deleteOrder(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(order => {
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.json({ message: 'Order not found' });
                }
            })
            .catch(next);
    }
    // [GET] /orders/:id
    getById(req, res, next) {
        Order.findById(req.params.id)
            .then(order => {
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.json({ message: 'Order not found' });
                }
            })
            .catch(next);
    }
    //[GET] /orders/user/:id
    getByUserId(req, res, next) {
        Order.find({ user: req.params.id })
            .then(orders => {
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