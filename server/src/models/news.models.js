const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const News = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true }, // (Tin tức, Thông báo, sale, ...)
    },
    {
        timestamps: true,
    }
);
News.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})
module.exports = mongoose.model('News', News);