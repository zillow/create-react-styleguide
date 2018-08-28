import { spawn } from 'child_process';
import { jest } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(jest, ['--updateSnapshot'], {
        stdio: 'inherit',
    }).on('close', callback);
};
