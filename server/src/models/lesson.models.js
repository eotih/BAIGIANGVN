const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Lesson = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },//
        image: { type: String, required: true },
        price: { type: Number, required: true },
        week: { type: Number, required: true }, 
        subject: { type: String, required: true }, 
        grade: { type: String, required: true },
        link: { type: String, required: true }, //
        category: { type: String, required: true },
        sale: { type: Number, required: true, default: 0 },
        isActive: { type: Boolean, default: true, required: true },
    },
    {
        timestamps: true,
    }
);

Lesson.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Lesson', Lesson);