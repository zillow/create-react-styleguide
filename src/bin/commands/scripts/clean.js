import path from 'path';
import runSeries from 'run-series';
import rimraf from 'rimraf';
import noop from '../../util/noop';

const currentDir = process.cwd();
const dirs = ['lib', 'es', 'styleguide'];

export default (argv, callback = noop) => {
    runSeries(dirs.map(dir => cb => rimraf(path.join(currentDir, dir), {}, cb)), callback);
};
