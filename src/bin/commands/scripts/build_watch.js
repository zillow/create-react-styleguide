import { spawn } from 'child_process';
import { nodemon } from '../../util/executables';
import noop from '../../util/noop';

export default (argv, callback = noop) => {
    spawn(nodemon, ['-w', 'src', '-x', 'create-react-styleguide script build'], {
        stdio: 'inherit',
    }).on('close', callback);
};
