const { createJestConfig } = require('./src');

const config = createJestConfig();
config.testPathIgnorePatterns.push('<rootDir>/templates/');

module.exports = config;
