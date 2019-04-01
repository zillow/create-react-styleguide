const { createJestConfig } = require('./src');

const config = createJestConfig({
    // Do not use jest.setup.js
    setupFilesAfterEnv: [],
});
config.testPathIgnorePatterns.push('<rootDir>/templates/');

module.exports = config;
