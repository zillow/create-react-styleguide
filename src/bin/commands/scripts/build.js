import runSeries from 'run-series';
import { spawn } from 'child_process';
import { babel } from '../../util/executables';
import noop from '../../util/noop';

export const BABEL_OPTIONS = ['src', '--out-dir', 'lib', '--copy-files'];
export const BABEL_OPTIONS_ES = ['src', '--out-dir', 'es', '--copy-files'];

export default (argv, callback = noop) => {
    runSeries([
        // Build commonjs modules
        cb => {
            spawn(babel, BABEL_OPTIONS, {
                stdio: 'inherit',
            }).on('close', cb);
        },
        // Build ES modules
        cb => {
            spawn(babel, BABEL_OPTIONS_ES, {
                stdio: 'inherit',
                env: Object.assign({}, process.env, {
                    BABEL_ENV: 'es',
                }),
            }).on('close', cb);
        },
        callback,
    ]);
};
