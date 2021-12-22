const { spawn } = require('child_process');
const { jest } = require('../../util/executables');
const noop = require('../../util/noop');
const { NODE_ENVIRONMENTS } = require('../../../lib');

module.exports = ({ callback = noop, flags = [] }) => {
    spawn(jest, [...flags], {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: NODE_ENVIRONMENTS.TEST,
        },
    }).on('close', callback);
};
