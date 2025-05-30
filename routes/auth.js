const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET;

const USERFILE = path.join(__dirname, '../data/users.json');

function readfsync(fpath) {
    const data = fs.readFileSync(fpath, 'utf-8');
    return JSON.parse(data);
}

function writefsync(fpath, data) {
    fs.writeFileSync(fpath, JSON.stringify(data, null, 2));
}

router.post('/register', (req, res) => {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password) {
        return res.status(400).send('not a data');
    }
    const users = readfsync(USERFILE);
    if (users.find(u => u.email === email)) {
        return res.status(400).send('user already exists');
    }
    const newUser   = { name, password, age, email, role: 'user' };
    users.push(newUser  );
    writefsync(USERFILE, users);
    res.status(201).send("users registered");
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readfsync(USERFILE);
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('not a user');
    }
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
