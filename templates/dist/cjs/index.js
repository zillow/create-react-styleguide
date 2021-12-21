if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod/index.js');
} else {
    module.exports = require('./dev/index.js');
}
