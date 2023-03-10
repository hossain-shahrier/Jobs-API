const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    // JWT Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]

    // verify the token
    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET)
        // attech the user to the job routes
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (err) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}
module.exports = authenticationMiddleware