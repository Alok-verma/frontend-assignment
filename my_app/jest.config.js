module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JS/JSX files
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // Allow Jest to transform axios
  ],
};
