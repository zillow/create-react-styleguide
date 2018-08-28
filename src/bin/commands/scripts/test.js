import { spawn } from 'child_process';
import { jest } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop, options = []) => {
    spawn(jest, options, {
        stdio: 'inherit',
    }).on('close', callback);
};
