function authorizeRole(role) {
    return function(req, res, next) {
        if (!req.user) {
            return res.status(401).send('Token error');
        }
        if (req.user.role !== role) {
            return res.status(403).send('Access denied');
        }
        next();
    }
}

module.exports = authorizeRole;
