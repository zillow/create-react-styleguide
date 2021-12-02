const { createJestConfig } = require('./lib');

const config = createJestConfig();

module.exports = {
    ...config,
    // TODO: test the CLI properly]
    collectCoverageFrom: ['lib/**/*.js', 'lib/**/*.jsx'],
    coveragePathIgnorePatterns: ['<rootDir>/bin/'],
    modulePathIgnorePatterns: [],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/templates/'],
};
