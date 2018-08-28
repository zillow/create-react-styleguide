import runSeries from 'run-series';
import runParallel from 'run-parallel';
import { spawn } from 'child_process';
import { babel } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop, watch = false) => {
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
                    env: Object.assign({}, process.env, {
                        BABEL_ENV: 'cjs',
                    }),
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
