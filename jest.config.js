const { jestConfig } = require('./lib');

module.exports = {
    ...jestConfig,
    collectCoverageFrom: ['lib/**/*.js', 'lib/**/*.jsx'],
    coveragePathIgnorePatterns: ['<rootDir>/bin/'],
    modulePathIgnorePatterns: [],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/templates/'],
};
