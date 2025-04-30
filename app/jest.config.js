module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/node_modules/**', // Exclude node_modules
        '!**/tests/**' // Exclude test files from coverage
    ],
    coverageDirectory: '<rootDir>/../coverage/unit', // Output directory for coverage reports
};