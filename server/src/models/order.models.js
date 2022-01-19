const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Order = new Schema(
    {
        lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        combos: [{ type: Schema.Types.ObjectId, ref: 'Combo' }],
        totalPrice: { type: Number, required: true },
        note: { type: String },
        state: { type: String, required: true, default: 'Pending' },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }// user who made the order
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Order', Order);