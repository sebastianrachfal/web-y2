import { INote } from '@/interfaces/INote';
import Note from '@/classes/Note';

/**
@jest-environment jsdom
*/
describe('Note', () => {
	it('should return long HTML', () => {
		expect(new Note({} as INote).getHTML().length).toBeGreaterThan(100);
	});

	it('should have all properties', () => {
		const note = new Note({
			title: 'test1',
			body: 'test2',
			pinned: true,
			color: '#fff',
			added: 1000,
		});

		expect(note.title).toBe('test1');
		expect(note.body).toBe('test2');
		expect(note.pinned).toBe(true);
		expect(note.color).toBe('#fff');
		expect(note.added).toBe(1000);
	});
});
