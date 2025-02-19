module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [], // patrones de modulos que deseamos que sean ignorados por JEST
};
// jest.setTimeout(160000);
