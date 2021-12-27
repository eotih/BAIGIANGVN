const User = require('../models/user.models');
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');

class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(user),
                });
                return;
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        }

    }
    async register(req, res, next) {
        const { email, password, name, mobile } = req.body;
        const user = new User({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 8),
            mobile: mobile,
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser),
        });
    }
    async resetPassword(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            user.password = bcrypt.hashSync(password, 8);
            await user.save();
            res.send({ message: 'Password reset successfully' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }
}
module.exports = new AuthController();