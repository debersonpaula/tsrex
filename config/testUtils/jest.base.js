module.exports = (source) => ({
  testMatch: [`<rootDir>/${source}/**/*.test.{js,jsx,ts,tsx}`],
  transform: JSON.stringify({
    '^.+\\.(ts|tsx)$': require.resolve('./babelTransform'),
    '^.+\\.(js|jsx)$': require.resolve('./babelTransformES6'),
  }),
  
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcovonly'],
  collectCoverageFrom: [`${source}/**/*.{ts,tsx}`, `!${source}/**/*.d.ts`],
  coverageThreshold: JSON.stringify({
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
  }),

  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      require.resolve('../mocks/fileMock'),
    '\\.(css)$': require.resolve('../mocks/styleMock'),
  },
  setupFiles: [
    require.resolve('./test-setup'),
    require.resolve('./test-shim'),
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  verbose: true
});
