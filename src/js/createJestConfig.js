import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

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
    setupTestFrameworkScriptFile: '<rootDir>/tests/setup-globals.js',
    testMatch: ['<rootDir>/**/__tests__/**/*.test.js', '<rootDir>/**/*.test.js'],
    testEnvironment: 'jsdom',
});

// Serialize emotion styles into snapshots unless overriden
// Serializers can be added through this function or by overriding the jest config object
const createJestSetupConfig = (serializers = [createSerializer(emotion)]) => {
    // eslint-disable-next-line
    serializers.forEach(s => expect.addSnapshotSerializer(s));
};

export { createJestConfig, createJestSetupConfig };
