const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TransactionHistory = new Schema(
  {
    email: { type: String, required: true },
    deposit_amount: { type: Number, required: true },
    account_balance: { type: Number, required: true },
    payment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TransactionHistory", TransactionHistory);
