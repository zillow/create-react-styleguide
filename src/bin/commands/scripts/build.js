import runSeries from 'run-series';
import { spawn } from 'child_process';
import { babel } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    runSeries([
        // Build commonjs modules
        cb => {
            spawn(babel, ['src', '--out-dir', 'lib', '--copy-files'], {
                stdio: 'inherit',
            }).on('close', cb);
        },
        // Build ES modules
        cb => {
            spawn(babel, ['src', '--out-dir', 'es', '--copy-files'], {
                stdio: 'inherit',
                env: Object.assign({}, process.env, {
                    BABEL_ENV: 'es',
                }),
            }).on('close', cb);
        },
        callback,
    ]);
};
