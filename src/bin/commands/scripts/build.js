import { spawn } from 'child_process';
import { nwb } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(nwb, ['build-react-component', '--no-demo'], {
        stdio: 'inherit',
    }).on('close', callback);
};
