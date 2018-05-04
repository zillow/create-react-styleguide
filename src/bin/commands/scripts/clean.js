import runSeries from 'run-series';
import { spawn } from 'child_process';
import { clean } from 'nwb/lib/utils';
import { nwb } from '../../util/executables';
import noop from '../../util/noop';

const nwbClean = (argv, callback = noop) => {
    spawn(nwb, ['clean-module'], {
        stdio: 'inherit',
    }).on('close', callback);
};

export default (argv, callback) => {
    runSeries(
        [
            // Clean 'build'
            cb => nwbClean(argv, cb),
            // Clean 'build:styleguide'
            cb => clean('styleguide', ['styleguide'], cb),
        ],
        callback
    );
};
