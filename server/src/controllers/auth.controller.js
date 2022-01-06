const User = require('../models/user.models');
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.json({
                    token: generateToken(user),
                    message: 'Login successfully',
                    status: 200
                });
                return;
            } else {
                res.status(401).json({ message: 'Invalid password', status: 401 });
            }
        } else {
            res.status(404).json({ message: 'User not found', status: 404 });
        }

    }
    async register(req, res, next) {
        const { email, password, name, mobile } = req.body;
        if (await User.findOne({ email: email })) {
            res.status(400).json({ message: 'User already exist', status: 400 });
        } else {
            const user = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 8),
                mobile: mobile,
            });
            const createdUser = await user.save();
            if (createdUser) {
                res.status(201).json({
                    message: 'User created successfully',
                    status: 200,
                    user: createdUser
                });
            } else {
                res.status(400).json({
                    message: 'User not created',
                    status: 400
                });
            }
        }
    }
    async resetPassword(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            user.password = bcrypt.hashSync(password, 8);
            await user.save();
            res.json({ message: 'Password reset successfully', status: 200 });
        } else {
            res.status(404).json({ message: 'User not found', status: 404});
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
            res.status(200).json({
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
            res.status(200).json({
                token: generateToken(createdUser),
                message: 'User created successfully',
            });
        }
    }
}
module.exports = new AuthController();