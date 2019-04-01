const runSeries = require('run-series');
const eslint = require('./eslint');
const test = require('./test');
const clean = require('./clean');
const build = require('./build');

module.exports = (argv, callback) => {
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
