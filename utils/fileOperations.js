const fs = require('fs');

function readfsync(fpath) {
    const data = fs.readFileSync(fpath, 'utf-8');
    return JSON.parse(data);
}

function writefsync(fpath, data) {
    fs.writeFileSync(fpath, JSON.stringify(data, null, 2));
}

module.exports = { readfsync, writefsync };
