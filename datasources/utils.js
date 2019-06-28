const fs = require('fs');
const { promisify } = require('util');

exports.writeFile = promisify(fs.writeFile);
exports.readFile = promisify(fs.readFile);
exports.existsFile = promisify(fs.exists);
exports.unlink = promisify(fs.unlink);
