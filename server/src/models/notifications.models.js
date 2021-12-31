const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Notifications = new Schema(
  {
    description: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", Notifications);
