const User = require('../models/user.models');

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
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(user => {
                res.json(user);
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