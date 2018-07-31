const createJestConfig = require('create-react-styleguide').createJestConfig;

module.exports = Object.assign(createJestConfig(), {
    setupTestFrameworkScriptFile: '<rootDir>/test-setup/setup-globals.js',
});
