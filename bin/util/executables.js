const path = require('path');

const currentPath = process.cwd();
const binPath = path.join(currentPath, 'node_modules/.bin');

module.exports = {
    eslint: path.join(binPath, 'eslint'),
    styleguidist: path.join(binPath, 'styleguidist'),
    rollup: path.join(binPath, 'rollup'),
    jest: path.join(binPath, 'jest'),
};
