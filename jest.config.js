const { createJestConfig } = require('./src');

const config = Object.assign(createJestConfig(), {});
config.testPathIgnorePatterns.push('<rootDir>/templates/');

module.exports = config;
