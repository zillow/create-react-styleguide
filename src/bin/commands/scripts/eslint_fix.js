const eslint = require('./eslint');

module.exports = options => eslint({ ...options, flags: ['--fix', ...options.flags] });
