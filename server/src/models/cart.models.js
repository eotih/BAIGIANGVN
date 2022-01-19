const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Cart = new Schema(
    {
        totalPrice: { type: Number, required: true },
        lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        combos: [{ type: Schema.Types.ObjectId, ref: 'Combo' }],
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Cart', Cart);