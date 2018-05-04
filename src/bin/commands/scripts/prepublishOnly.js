import runSeries from 'run-series';
import clean from './clean';
import build from './build';

export default (argv, callback) => {
    runSeries([cb => clean(argv, cb), cb => build(argv, cb)], callback);
};
