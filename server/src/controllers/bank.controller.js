const Bank = require("../models/Bank.models");

class BankController {
  // [GET] /bank
  show(req, res, next) {
    Bank.find()
      .sort({ createdAt: -1 })
      .then((bank) => {
        res.status(200).json(bank);
      })
      .catch(next);
  }
  //[POST] /bank
  create(req, res, next) {
    const { name, logo, qr_code, account_number, branch } = req.body;
    if (!name || !logo || !qr_code || !account_number || !branch) {
      res.status(400).json({
        message: "Please provide all the required fields",
      });
    } else {
      Bank.create({
        name,
        logo,
        qr_code,
        account_number,
        branch,
      })
        .then((bank) => {
          res.status(200).json({ message: "Bank created successfully"});
        })
        .catch(next);
    }
  }
  // [PUT] /bank/:id
  update(req, res, next) {
    Bank.findById(req.params.id)
      .then((bank) => {
        if (!bank) {
          res.status(404).json({
            message: "Bank not found",
          });
        } else {
          const { name, logo, qr_code, account_number, branch } = req.body;
          if (!description || !status || !type) {
            res.status(400).json({
              message: "Please provide all the required fields",
            });
          } else {
            bank.name = name;
            bank.logo = logo;
            bank.qr_code = qr_code;
            bank.account_number = account_number;
            bank.branch = branch;
            bank
              .save()
              .then((updatedBank) => {
                res.status(200).json({
                  message: "Bank updated successfully",
                  updatedBank,
                });
              })
              .catch(next);
          }
        }
      })
      .catch(next);
  }
  // [DELETE] /bank/:id
  async deleteBank(req, res, next) {
    const Bank = await Bank.findById(req.params.id);
    if (Bank) {
      const deleteBank = await Bank.remove();
      res.status(200).json({ message: "Bank Deleted", bank: deleteBank });
    } else {
      res.status(200).json({ message: "Bank not found" });
    }
  }
  // [GET] /bank/:id
  getById(req, res, next) {
    Bank.findById(req.params.id)
      .then((bank) => {
        if (!bank) {
          res.status(404).json({
            message: "User not found",
          });
        } else {
          res.status(200).json(bank);
        }
      })
      .catch(next);
  }
}
module.exports = new BankController();
