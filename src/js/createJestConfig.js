const createJestConfig = () => ({
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
    coveragePathIgnorePatterns: [],
    coverageReporters: ['cobertura', 'html', 'text'],
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 80,
            lines: 70,
            statements: 70,
        },
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.test.js', '<rootDir>/**/*.test.js'],
    testEnvironment: 'node',
    setupTestFrameworkScriptFile: '<rootDir>/test-setup/setup-globals.js',
});

export default createJestConfig;
