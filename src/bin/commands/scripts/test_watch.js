const test = require('./test');

module.exports = (argv, callback) => test(argv, callback, ['--watch']);
