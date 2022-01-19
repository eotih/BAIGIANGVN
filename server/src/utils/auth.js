const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const { _id, name, email, isAdmin, image } = user;
    return jwt.sign(
        {
            _id: _id,
            name: name,
            email: email,
            isAdmin: isAdmin,
            image: image,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
}

const isAuthenticated = (req, res, next) => {
    const authorization = req.headers['x-access-token'] || req.headers['authorization'];
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token',
                });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'No token provided',
        });
    }
}
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid Admin Token' });
    }
};
const googleAuth = (req, res, next) => {
    if (req.user && req.user.google) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid Google Token' });
    }
}
module.exports = { generateToken, isAuthenticated, isAdmin, googleAuth };