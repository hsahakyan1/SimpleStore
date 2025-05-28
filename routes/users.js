const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const USERFILE = path.join(__dirname, '../data/users.json');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');

function readfsync(fpath) {
    const data = fs.readFileSync(fpath, 'utf-8');
    return JSON.parse(data);
}


router.get('/', authenticateJWT, authorizeRole('admin'), (req, res) => {
    const users = readfsync(USERFILE);
    const userData = users.map(u => ({
        name: u.name,
        email: u.email,
        age: u.age,
        role: u.role
    }));
    res.status(200).json(userData);
});

module.exports = router;
