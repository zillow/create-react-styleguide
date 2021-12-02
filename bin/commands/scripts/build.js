const runSeries = require('run-series');
const runParallel = require('run-parallel');
const { spawn } = require('child_process');
const { babel } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = ({ callback = noop, flags }) => {
    const cjsOptions = ['src', '--out-dir', 'lib', '--copy-files', ...flags];
    const esmOptions = ['src', '--out-dir', 'es', '--copy-files', ...flags];

    const runner = flags.indexOf('--watch') >= 0 ? runParallel : runSeries;
    runner(
        [
            // Build CommonJS modules
            cb => {
                spawn(babel, cjsOptions, {
                    stdio: 'inherit',
                    env: { ...process.env, BABEL_ENV: 'cjs' },
                }).on('close', cb);
            },
            // Build ES modules (default)
            cb => {
                spawn(babel, esmOptions, {
                    stdio: 'inherit',
                }).on('close', cb);
            },
        ],
        callback
    );
};
