module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src/components'],
  transform: {
    '\\.js$': ['babel-jest', { configFile: './jest/babel.config.js' }],
  },
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@slices(.*)$': '<rootDir>/src/slices$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@actions(.*)$': '<rootDir>/src/actions$1',
    '^.+\\.(css|scss)$': '<rootDir>/jest/no-op.js',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/test-utils/**/*.js',
  ],
  coverageDirectory: '<rootDir>/jest/coverage',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testEnvironment: 'jsdom',
  globals: {
    __DEV__: true,
    __PROD__: false,
    __CLIENT__: true,
    __SERVER__: false,
    __TEST__: true,
  },
}
