const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Order = new Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            }
        ],
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, // user who made the order
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

Order.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Order', Order);