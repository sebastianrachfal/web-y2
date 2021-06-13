import { uuid, getColorFromTime } from '@/helpers';

describe('UUID', () => {
	it('should be unique', () => {
		const uniqueIds = new Array(50)
			.fill(() => uuid())
			.map((item) => item());

		expect(new Set(uniqueIds).size).toBe(uniqueIds.length);
	});
});

describe('getColorFromTime', () => {
	it('should return proper values', () => {
		expect(getColorFromTime(0)).toBe('color: #50FA7B');
		expect(getColorFromTime(2)).toBe('color: #F1FA8C');
		expect(getColorFromTime(2.5)).toBe('color: #F1FA8C');
		expect(getColorFromTime(3)).toBe('color: #FF5555');
	});
});
