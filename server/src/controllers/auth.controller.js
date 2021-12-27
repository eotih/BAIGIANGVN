const User = require('../models/user.models');
const { generateToken } = require('../utils/auth');

class AuthController {
    login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'Invalid email or password',
                    });
                }
                if (!user.comparePassword(password)) {
                    return res.status(401).json({
                        message: 'Invalid email or password',
                    });
                }
                return res.json({
                    token: generateToken(user),
                });
            })
            .catch(next);
    }
    register(req, res, next) {
        const { email, password, name } = req.body;
        User.create({ email, password, name })
            .then(user => {
                return res.json({
                    token: generateToken(user),
                });
            })
            .catch(next);
    }
}
module.exports = new AuthController();