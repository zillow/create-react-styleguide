const { createJestConfig } = require('./src');

const config = createJestConfig();

module.exports = {
    ...config,
    // TODO: test the CLI properly
    coveragePathIgnorePatterns: ['<rootDir>/src/bin/'],
    testPathIgnorePatterns: [...config.testPathIgnorePatterns, '<rootDir>/templates/'],
};
