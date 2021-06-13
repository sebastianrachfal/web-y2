const merge = require('merge');
const ts_preset = require('ts-jest/jest-preset');
const puppeteer_preset = require('jest-puppeteer/jest-preset');

module.exports = merge.recursive(ts_preset, puppeteer_preset, {
	globals: {
		test_url: 'http://127.0.0.1:8080',
	},
	transform: {
		'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
	moduleNameMapper: {
		'@/config': '<rootDir>/src/config.ts',
		'@/types(.*)$': '<rootDir>/src/types$1',
		'@/decorators(.*)$': '<rootDir>/src/decorators$1',
		'@/classes(.*)$': '<rootDir>/src/classes$1',
		'@/helpers(.*)$': '<rootDir>/src/helpers$1',
		'@/storage/Firebase': '<rootDir>/src/classes/storage/Firebase.ts',
		'@/storage/LocalStorage':
			'<rootDir>/src/classes/storage/LocalStorage.ts',
	},
});
