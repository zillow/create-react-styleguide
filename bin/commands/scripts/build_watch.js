const build = require('./build');

module.exports = options => build({ ...options, flags: ['--watch', ...options.flags] });
