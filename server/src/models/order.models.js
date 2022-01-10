const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Order = new Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                lesson: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Lesson',
                    required: true
                },
            }
        ],
        paymentMethod: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, // user who made the order
        paidAt: { type: Date },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Order', Order);