const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.authUserData = { userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or missing token' });
    }
}

module.exports = { validateToken };