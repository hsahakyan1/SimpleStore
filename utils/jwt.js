const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function generateToken(user) {
    return jwt.sign({ name: user.name, email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
