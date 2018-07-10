import { spawn } from 'child_process';
import { eslint } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(eslint, ['src/**/*.{js,jsx}'], {
        stdio: 'inherit',
    }).on('close', callback);
};
