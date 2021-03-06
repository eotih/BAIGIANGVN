const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String, default: '' },
        mobile: { type: String, },
        googleId: { type: String, },
        money: { type: Number, default: 0, min: 0 },
        deposited: { type: Number, default: 0, min: 0 },
        isAdmin: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', User);