const { spawn } = require('child_process');
const { eslint } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = (argv, callback = noop) => {
    spawn(eslint, ['**/*.{js,jsx}', '--fix'], {
        stdio: 'inherit',
    }).on('close', callback);
};
