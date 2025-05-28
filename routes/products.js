const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const PRODUCTS = path.join(__dirname, '../data/products.json');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');

function readfsync(fpath) {
    const data = fs.readFileSync(fpath, 'utf-8');
    return JSON.parse(data);
}

function writefsync(fpath, data) {
    fs.writeFileSync(fpath, JSON.stringify(data, null, 2));
}


router.get('/', (req, res) => {
    const products = readfsync(PRODUCTS);
    res.json(products);
});


router.post('/', authenticateJWT, authorizeRole('admin'), (req, res) => {
    const products = readfsync(PRODUCTS);
    products.push(req.body);
    writefsync(PRODUCTS, products);
    res.status(201).send('product created');
});

module.exports = router;
