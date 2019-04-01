const runSeries = require('run-series');
const runParallel = require('run-parallel');
const { spawn } = require('child_process');
const { babel } = require('../../util/executables');
const noop = require('../../util/noop');

module.exports = (argv, callback = noop, watch = false) => {
    let runner = runSeries;
    const cjsOptions = ['src', '--out-dir', 'lib', '--copy-files'];
    const esmOptions = ['src', '--out-dir', 'es', '--copy-files'];
    if (watch) {
        runner = runParallel;
        cjsOptions.push('--watch');
        esmOptions.push('--watch');
    }
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
