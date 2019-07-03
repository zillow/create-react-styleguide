const runSeries = require('run-series');
const eslint = require('./eslint');
const test = require('./test');
const clean = require('./clean');
const build = require('./build');

module.exports = options => {
    runSeries(
        [
            cb => eslint({ ...options, callback: cb }),
            cb => test({ ...options, callback: cb }),
            cb => clean({ ...options, callback: cb }),
            cb => build({ ...options, callback: cb }),
        ],
        options.callback
    );
};
