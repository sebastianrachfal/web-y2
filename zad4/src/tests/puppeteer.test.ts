describe('NoteKeep', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
	});

	it('should be titled "NoteKeep - Rachfał"', async () => {
		await expect(page.title()).resolves.toMatch('NoteKeep - Rachfał');
	});

	it('should fill note title', async () => {
		await page.type('#note-title', 'Title of a note');
	});

	it('should fill note body', async () => {
		await page.type('#note-body', 'Body of a note');
	});

	it('should add note', async () => {
		await page.click('#note-add');
		const note = await page.$('.note');
		const title = await (
			await note.$('h3')
		).evaluate((node) => node.innerHTML);

		const body = await (
			await note.$('pre')
		).evaluate((node) => node.innerHTML);

		expect(title).toBe('Title of a note');
		expect(body).toBe('Body of a note');
	});
});
