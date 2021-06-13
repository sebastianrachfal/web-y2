import Storage from '@/classes/Storage';

class LocalStorageMock {
	store: any = {};

	getItem(key: string) {
		return this.store[key] || null;
	}

	setItem(key: string, value: string) {
		this.store[key] = String(value);
	}
}
global.localStorage = new LocalStorageMock() as any;

/**
@jest-environment jsdom
*/
describe('Storage', () => {
	const storage = new Storage();

	it('should return Promise on init', () => {
		expect(storage.init() instanceof Promise).toBe(true);
	});

	it('should return Promise on readData', () => {
		expect(storage.readData() instanceof Promise).toBe(true);
	});
});
