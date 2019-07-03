const { spawn } = require('child_process');
const { jest } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = ({ callback = noop, flags = [] }) => {
    spawn(jest, flags, {
        stdio: 'inherit',
    }).on('close', callback);
};
