import { INote } from '@/interfaces/INote';

export default class Note implements INote {
	name: string;
	content: string;
	pinned: boolean;
	color: string;
	added: Date;

	constructor({ name, content, pinned, color, added }: INote) {
		[this.name, this.content, this.pinned, this.color, this.added] = [
			name,
			content,
			pinned,
			color,
			added,
		];
	}

	getHTML(): string {
		return `
        `;
	}
}
