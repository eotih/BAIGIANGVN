const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const fs = require('fs');

class UserController {
    // [GET] /users
    show(req, res, next) {
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(next);
    }
    // [PUT] /users/:id
    updateProfile(req, res, next) {
        var form = new formidable.IncomingForm();
        form.options.uploadDir = "./src/public/assets/";
        form.parse(req, function (err, fields, files) {
            const { name, email, mobile } = fields;
            const { image } = files;
            if (!image) {
                res.status(400).json({
                    message: 'Missing image'
                });
            }
            else if (!name || !email || !mobile) {
                res.status(400).json({
                    message: 'Missing fields'
                });
            }
            else {
                const imagePath = "./src/public/assets/images/profile/" + name + '/' + image.originalFilename;
                fs.copyFile(image.filepath, imagePath, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return ('File uploaded successfully');
                });
                User.findByIdAndUpdate(req.params.id, {
                    name: name,
                    image: `/assets/images/profile/${name}/${image.originalFilename}`,
                    email: email,
                    mobile: mobile
                })
                    .then(User => {
                        res.status(200).json(User);
                    })
                    .catch(next);

            }
        });
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
    deleteUser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(user => {
                res.json(user);
            })
            .catch(next);
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