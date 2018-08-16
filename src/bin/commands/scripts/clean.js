import path from 'path';
import runSeries from 'run-series';
import rimraf from 'rimraf';
import ora from 'ora';
import noop from '../../util/noop';

const currentDir = process.cwd();
const dirs = ['lib', 'es', 'styleguide', 'coverage'];

export default (argv, callback = noop) => {
    runSeries(
        dirs.map(dir => cb => {
            const spinner = ora(`Deleting ${dir}`).start();
            rimraf(path.join(currentDir, dir), {}, error => {
                spinner.succeed();
                cb(error);
            });
        }),
        callback
    );
};
