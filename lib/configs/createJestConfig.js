module.exports = function createJestConfig(config) {
    const newConfig = {
        // Avoid polluting global cache directory
        cacheDirectory: './node_modules/.cache/jest',
        clearMocks: true,
        collectCoverage: false,
        collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
        coveragePathIgnorePatterns: ['<rootDir>/src/styleguidist/'],
        coverageReporters: ['cobertura', 'html', 'text'],
        coverageThreshold: {
            global: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
        modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/es/'],
        testEnvironment: 'jsdom',
        testMatch: ['<rootDir>/**/__tests__/**/*.test.js', '<rootDir>/**/*.test.js'],
        testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/', '<rootDir>/es/'],
        ...config,
    };

    if (process.env.DEBUG) {
        // eslint-disable-next-line no-console
        console.log('createJestConfig object:', JSON.stringify(newConfig, null, 4));
    }

    return newConfig;
};
