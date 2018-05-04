import { spawn } from 'child_process';
import { styleguidist } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(styleguidist, ['build'], {
        stdio: 'inherit',
    }).on('close', callback);
};
