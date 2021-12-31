const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Notifications = new Schema(
  {
    description: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", Notifications);
