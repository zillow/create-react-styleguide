const { spawn } = require('child_process');
const { eslint } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = ({ callback = noop, flags }) => {
    spawn(eslint, ['**/*.{js,jsx}', ...flags], {
        stdio: 'inherit',
    }).on('close', callback);
};
