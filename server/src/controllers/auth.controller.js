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
                    token: generateToken(user),
                });
                return;
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }

    }
    async register(req, res, next) {
        const { email, password, name, mobile } = req.body;
        if (await User.findOne({ email: email })) {
            res.status(400).send({ message: 'User already exist' });
        } else {
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
                mobile: createdUser.mobile,
                money: createdUser.money,
                isAdmin: createdUser.isAdmin,
                message: 'User created successfully',
            });
        }
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
    async loginWithGoogle(req, res, next) {
        const { email, name, imageUrl, googleId } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                user.image = imageUrl;
                await user.save();
            }
            res.status(200).send({
                token: generateToken(user),
            });
        } else {
            const newUser = new User({
                name: name,
                email: email,
                image: imageUrl,
                googleId: googleId,
            });
            const createdUser = await newUser.save();
            res.status(200).send({
                token: generateToken(createdUser),
                message: 'User created successfully',
            });
        }
    }
}
module.exports = new AuthController();