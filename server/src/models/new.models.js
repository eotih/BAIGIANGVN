const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const New = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true }, // (Tin tức, Thông báo, sale, ...)
        isActive: { type: Boolean, default: true, required: true },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('New', New);