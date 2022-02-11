module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  setupFiles: ["jest-canvas-mock"],
  moduleNameMapper: {
    "\\.(ogg|mp3|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
};
