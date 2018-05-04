import { spawn } from 'child_process';
import { nwb } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(nwb, ['test-react', '--server'], {
        stdio: 'inherit',
    }).on('close', callback);
};
