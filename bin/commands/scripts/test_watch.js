const test = require('./test');

module.exports = options => test({ ...options, flags: ['--watch', ...options.flags] });
