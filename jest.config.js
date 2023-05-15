/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/app/javascript/__mocks__/styleMock.js",
  },
  moduleDirectories: [
    'node_modules',
    'app/javascript',
    'app/javascript/components',
    'app/javascript/domains'
  ],
};