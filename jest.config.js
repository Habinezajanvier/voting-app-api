module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/dist"],
  coverageReporters: ["lcov", "html"],
  testTimeout: 30000,
  collectCoverageFrom: ["**/*.{js,ts}"],
};
