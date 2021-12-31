const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Bank = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    account_number: { type: String, required: true },
    qr_code: { type: String, required: true },
    branch: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bank", Bank);
