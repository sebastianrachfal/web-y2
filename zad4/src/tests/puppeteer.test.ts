describe('NoteKeep', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:8080');
	});

	it('should be titled "NoteKeep - Rachfał"', async () => {
		await expect(page.title()).resolves.toMatch('NoteKeep - Rachfał');
	});
});
