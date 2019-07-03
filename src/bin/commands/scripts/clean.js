const path = require('path');
const runSeries = require('run-series');
const rimraf = require('rimraf');
const ora = require('ora');
const noop = require('../../util/noop');

const currentDir = process.cwd();
const dirs = ['lib', 'es', 'styleguide', 'coverage'];

module.exports = ({ callback = noop }) => {
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
