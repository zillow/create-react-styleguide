const test = require('./test');

module.exports = options => test({ ...options, flags: ['--coverage', ...options.flags] });
