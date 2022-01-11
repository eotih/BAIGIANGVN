const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Combo = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        sale: { type: String, required: true },
        lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Combo', Combo);