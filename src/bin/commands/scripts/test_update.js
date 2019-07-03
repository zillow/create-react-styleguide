const test = require('./test');

module.exports = options => test({ ...options, flags: ['--updateSnapshot', ...options.flags] });
