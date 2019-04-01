module.exports = function createJestConfig(config) {
    const newConfig = {
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
        testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/', '<rootDir>/es/'],
        setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        ...config,
    };

    if (process.env.DEBUG) {
        // eslint-disable-next-line no-console
        console.log('createJestConfig object:', JSON.stringify(newConfig, null, 4));
    }

    return newConfig;
};
