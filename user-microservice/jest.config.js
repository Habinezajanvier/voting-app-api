module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist",
    "/__test__",
    "/src/types",
    "/src/index.ts",
  ],
  testTimeout: 30000,
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
