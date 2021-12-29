const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const fs = require('fs');

class UserController {
    // [GET] /users
    show(req, res, next) {
        User.find().sort({ createdAt: -1 })
            .then(users => {
                res.json(users);
            })
            .catch(next);
    }
    // [PUT] /users/:id
    updateProfile(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'User not found'
                    });
                }
                else {
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.mobile = req.body.mobile;
                    user.save()
                        .then(user => {
                            res.json(user);
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }
    // [PUT] /users/password/:id
    updatePassword(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'User not found'
                    });
                }
                else {
                    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                        user.password = bcrypt.hashSync(req.body.newPassword, 10);
                        user.save()
                            .then(user => {
                                res.json(user);
                            })
                            .catch(next);
                    }
                    else {
                        res.status(400).json({
                            message: 'Wrong password'
                        });
                    }
                }
            })
            .catch(next);
    }
    // [DELETE] /users/:id
    async deleteUser(req, res, next) {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }
        else {
            user.remove()
                .then(() => {
                    res.status(200).json({
                        message: 'User deleted'
                    });
                })
                .catch(next);
        }
    }
    // [GET] /users/:id
    getById(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                res.json(user);
            })
            .catch(next);
    }
}
module.exports = new UserController;