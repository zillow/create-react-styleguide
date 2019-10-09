const { createJestConfig } = require('./src');

const config = createJestConfig();

module.exports = {
    ...config,
    testPathIgnorePatterns: [...config.testPathIgnorePatterns, '<rootDir>/templates/'],
};
