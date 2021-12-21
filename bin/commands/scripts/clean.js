const path = require('path');
const runSeries = require('run-series');
const rimraf = require('rimraf');
const ora = require('ora');
const noop = require('../../util/noop');
const { DIRECTORIES } = require('../../../lib');

const currentDir = process.cwd();
const dirs = [DIRECTORIES.COVERAGE, DIRECTORIES.DIST, DIRECTORIES.STYLEGUIDE];

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
