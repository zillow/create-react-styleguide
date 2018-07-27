import { spawn } from 'child_process';
import { babel } from '../../util/executables';
import noop from '../../util/noop';
import { BABEL_OPTIONS, BABEL_OPTIONS_ES } from './build';

export default (argv, callback = noop) => {
    spawn(babel, [...BABEL_OPTIONS, '--watch'], {
        stdio: 'inherit',
    }).on('close', callback);

    spawn(babel, [...BABEL_OPTIONS_ES, '--watch'], {
        stdio: 'inherit',
    }).on('close', callback);
};
