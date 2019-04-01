const { spawn } = require('child_process');
const { jest } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = (argv, callback = noop, options = []) => {
    spawn(jest, options, {
        stdio: 'inherit',
    }).on('close', callback);
};
