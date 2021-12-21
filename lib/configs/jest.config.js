module.exports = {
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
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    setupFilesAfterEnv: ['jest-styled-components'],
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/**/__tests__/**/*.test.js', '<rootDir>/**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
};
