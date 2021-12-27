const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
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
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

module.exports = { generateToken, isAuthenticated, isAdmin };