import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
moduleNameMapper: {
  '\\.(scss|css)$': 'identity-obj-proxy',
  '\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.ts',
},

};

export default config;
