const User = require('../models/user.models');
const bcrypt = require('bcryptjs');

class UserController {
    // [GET] /users
    show(req, res, next) {
        User.find().sort({ createdAt: -1 })
            .then(users => {
                res.status(200).json(users);
            })
            .catch(next);
    }
    // [PUT] /users/:id
    updateProfile(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'User not found', status: 404
                    });
                }
                else {
                    const { name, mobile } = req.body;
                    if (!name || !mobile) {
                        res.status(400).json({
                            message: 'Please provide all the required fields'
                        });
                    } else {
                        user.name = name;
                        user.mobile = mobile;
                        user.save()
                            .then(user => {
                                if (!user) {
                                    res.status(400).json({
                                        message: 'User not found', status: 400
                                    });
                                }
                                else {
                                    res.status(200).json({
                                        message: 'User updated successfully',
                                        status: 200,
                                        user
                                    });
                                }
                            })
                            .catch(next);
                    }
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
                        message: 'User not found', status: 404
                    });
                }
                else {
                    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                        user.password = bcrypt.hashSync(req.body.newPassword, 10);
                        user.save()
                            .then(user => {
                                if (user) {
                                    res.status(200).json({
                                        message: 'Password updated successfully',
                                        status: 200,
                                        user
                                    });
                                } else {
                                    res.status(400).json({
                                        message: 'Password not updated',
                                        status: 400
                                    });
                                }
                            })
                            .catch(next);
                    }
                    else {
                        res.status(400).json({
                            message: 'Wrong password', status: 400
                        });
                    }
                }
            })
            .catch(next);
    }
    // [DELETE] /users/:id
    async deleteUser(req, res, next) {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            res.status(200).json({ message: 'User Deleted', status: 200 });
        } else {
            res.status(400).json({ message: 'User not found', status: 404});
        }
    }
    // [GET] /users/:id
    getById(req, res, next) {
        // find with out password and googleId
        User.findById(req.params.id)
            .select('-password -googleId')
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(next);
    }
}
module.exports = new UserController;