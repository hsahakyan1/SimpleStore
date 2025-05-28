const jwt = require('jsonwebtoken');
const SECRET = 'shhhh';

function authenticateJWT(req, res, next) {
    const headerpars = req.headers.Authorization;
    if (!headerpars) {
        return res.status(401).send('Token error');
    }

    const token = headerpars.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send('invalid token');
    }
}

module.exports = authenticateJWT;
