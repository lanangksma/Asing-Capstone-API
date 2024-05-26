const Jwt = require('@hapi/jwt');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return Jwt.token.generate(payload, { key: secretKey, algorithm: 'HS256' });
};

const verifyToken = (token) => {
    try {
        return Jwt.token.decode(token, { key: secretKey, algorithms: ['HS256'] });
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
