const Order = require('../models/order.models');

class OrderController {
    // [GET] /orders
    show(req, res, next) {
        Order.find()
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
            const order = new Order({
                orderItems: orderItems,
                user: req.user._id,
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice,
                totalPrice: totalPrice,
            });
            const createdOrder = await order.save();
            return res.status(201).json({ message: 'New Order Created', order: createdOrder });
        }
    }
    // [PUT] /orders/:id/pay
    async pay(req, res, next) {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save();
            return res.status(200).json({ message: 'Order Paid', order: updatedOrder });
        } else {
            return res.status(404).json({ message: 'Order Not Found' });
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