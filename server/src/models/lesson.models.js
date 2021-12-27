const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Lesson = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        slide: { type: Number, required: true }, // (Powerpoint đó có bao nhiêu slide)
        week: { type: Number, required: true }, // Tuần thứ mấy (Tuần 1, Tuần 2, ...)
        subject: { type: String, required: true }, // Môn học (Toán Văn Sử Địa)
        class: { type: String, required: true }, // Lớp mấy (1 - 5)
        link: { type: String, required: true }, // Link để download file
        category: { type: String, required: true },
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