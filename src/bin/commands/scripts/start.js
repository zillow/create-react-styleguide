const { spawn } = require('child_process');
const { styleguidist } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = ({ callback = noop }) => {
    spawn(styleguidist, ['server'], {
        stdio: 'inherit',
    }).on('close', callback);
};
