"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "tests",
    testRegex: ".*\\.test\\.ts$",
    moduleNameMapper: {
        "^@daos/(.*)": "<rootDir>../src/daos/$1",
        "^@entities/(.*)": "<rootDir>../src/entities/$1",
        "^@shared/(.*)": "<rootDir>../src/shared/$1",
        "^@server": "<rootDir>../src/Server",
    },
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
};
exports.default = config;
