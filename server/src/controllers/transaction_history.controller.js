const TransactionHistory = require("../models/transaction_history.models");
const User = require("../models/user.models");

class TransactionHistoryController {
  // [GET] /transaction_history
  show(req, res, next) {
    TransactionHistory.find()
      .sort({ createdAt: -1 })
      .then((transaction_history) => {
        if (transaction_history) {
          res.status(200).json(transaction_history);
        } else {
          res.status(404).json({
            message: "Transaction History not found",
          });
        }
      })
      .catch(next);
  }
  async create(req, res, next) {
    const { email, deposit_amount, payment } = req.body;
    const user = await User.findOne({ email }); // find user by email
    const admin = await User.findOne({ isAdmin: true, email: req.user.email }); // find admin
    const new_account_balance = user.money + Number(deposit_amount); // add deposit amount to user account balance
    const adminBalance = admin.money + Number(deposit_amount); // deduct deposit amount from admin account balance
    if (!email || !deposit_amount || !payment) {
      // check if all fields are provided
      res.status(400).json({
        message: "Please provide all the required fields",
        status: 400
      });
    } else {
      if (!user) {
        // check if user exists
        res.status(404).json({
          message: "User not found",
          status: 404
        });
      } else {
        // save to account balance
        user.account_balance = new_account_balance;
        user.save();
        // save to admin balance
        admin.money = adminBalance;
        admin.save();
        // save to transaction history
        const transactionHistory = await TransactionHistory.create({
          email: email,
          deposit_amount: Number(deposit_amount),
          account_balance: new_account_balance,
          payment: payment,
        });
        res.status(200).json({ message: "Transaction History created successfully", transactionHistory, status: 200 });
      }
    }
  }
  // [PUT] /transaction_history/:id
  //   update(req, res, next) {
  //   }
  // [DELETE] /transaction_history/:id
  async deleteTransactionHistory(req, res, next) {
    const transactionHistory = await TransactionHistory.findById(req.params.id);
    if (transactionHistory) {
      const deleteTransactionHistory = await TransactionHistory.remove();
      res.status(200).json({
        message: "Transaction History Deleted",
        transaction_history: deleteTransactionHistory,
        status: 200
      });
    } else {
      res.status(404).json({ message: "Transaction History not found", status: 404 });
    }
  }
  // [GET] /transaction_history/:id
  getById(req, res, next) {
    const emailCheck = req.params.slug;
    TransactionHistory.find({ email: emailCheck })
      .then((transactionHistory) => {
        if (!transactionHistory) {
          res.status(404).json({
            message: "Transaction History not found",
          });
        } else {
          res.status(200).json(transactionHistory);
        }
      })
      .catch(next);
  }
}
module.exports = new TransactionHistoryController();
