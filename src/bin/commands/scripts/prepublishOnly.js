import runSeries from 'run-series';
import eslint from './eslint';
import test from './test';
import clean from './clean';
import build from './build';

export default (argv, callback) => {
    runSeries(
        [
            cb => eslint(argv, cb),
            cb => test(argv, cb),
            cb => clean(argv, cb),
            cb => build(argv, cb),
        ],
        callback
    );
};
