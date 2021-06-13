import { INote } from '@/interfaces/INote';
import Note from '@/classes/Note';
import Storage from '@/classes/Storage';
import profiler from '@/decorators/profiler';
export default class App {
	notes: Note[] = [];

	noteCreator: HTMLDivElement;

	creatorTitle: HTMLInputElement;
	creatorBody: HTMLTextAreaElement;
	creatorColor: HTMLInputElement;

	pinnedContainer: HTMLDivElement;
	notesContainer: HTMLDivElement;

	constructor() {
		const storage = new Storage();

		storage.init().then((data: Note[]) => {
			this.notes = data;
			this.getElements();
			this.applyEvents();

			this.printNotes();
		});

		window.addEventListener('beforeunload', () =>
			storage.saveData(this.notes)
		);
	}

	@profiler
	getElements() {
		this.noteCreator = document.getElementById(
			'note-creator'
		) as HTMLDivElement;

		this.notesContainer = document.getElementById(
			'notes-container'
		) as HTMLDivElement;

		this.pinnedContainer = document.getElementById(
			'pinned-container'
		) as HTMLDivElement;

		this.creatorTitle = document.getElementById(
			'note-title'
		) as HTMLInputElement;

		this.creatorBody = document.getElementById(
			'note-body'
		) as HTMLTextAreaElement;

		this.creatorColor = document.getElementById(
			'note-color'
		) as HTMLInputElement;
	}

	@profiler
	applyEvents() {
		document
			.getElementById('note-add')
			.addEventListener('click', () => this.addNote());

		this.creatorBody.addEventListener('input', () => {
			this.creatorBody.style.height = '48px';
			this.creatorBody.style.height = `${this.creatorBody.scrollHeight}px`;
		});

		this.creatorBody.addEventListener('keydown', function (e) {
			if (e.key === 'Tab') {
				var val = this.value,
					start = this.selectionStart,
					end = this.selectionEnd;
				this.value =
					val.substring(0, start) + '\t' + val.substring(end);
				this.selectionStart = this.selectionEnd = start + 1;
				e.preventDefault();
			}
		});

		this.creatorColor.addEventListener(
			'input',
			(e) =>
				(this.noteCreator.style.backgroundColor = (
					e.target as HTMLInputElement
				).value)
		);
	}

	flashTitle() {
		this.creatorTitle.className = 'flash-placeholder';
		setTimeout(() => (this.creatorTitle.className = ''), 200);
	}

	@profiler
	addNote() {
		const title = this.creatorTitle.value;

		if (title.length === 0) return this.flashTitle();

		const body = this.creatorBody.value;
		const color = this.creatorColor.value;

		this.notes.push(
			new Note({
				title,
				body,
				color,
				pinned: false,
				added: Date.now(),
			})
		);

		this.clearCreator();
		this.printNotes();
	}

	clearCreator() {
		this.creatorBody.value = '';
		this.creatorTitle.value = '';
		this.creatorColor.value = '#202124';

		this.noteCreator.style.backgroundColor = '#202124';

		this.creatorBody.dispatchEvent(new Event('input'));
	}

	clearContainers() {
		this.pinnedContainer.innerHTML = '';
		this.notesContainer.innerHTML = '';
	}

	@profiler
	printNotes() {
		this.clearContainers();

		const pinnedNotes = this.notes
			.filter((note: INote) => note.pinned)
			.sort((a, b) => b.added - a.added);

		const otherNotes = this.notes
			.filter((note: INote) => !note.pinned)
			.sort((a, b) => b.added - a.added);

		const pushNote = (container: HTMLDivElement, note: Note) =>
			(container.innerHTML += note.getHTML());

		for (const note of pinnedNotes) pushNote(this.pinnedContainer, note);

		for (const note of otherNotes) pushNote(this.notesContainer, note);
	}

	@profiler
	handlePin(uuid: string) {
		const note = this.notes.find((note: INote) => note.id === uuid);

		note.pinned = !note.pinned;

		this.printNotes();
	}
}
