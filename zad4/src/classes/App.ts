export default class App {
	textArea: HTMLTextAreaElement;
	colorPicker: HTMLInputElement;
	noteCreator: HTMLDivElement;

	constructor() {
		this.getElements();
		this.applyEvents();
	}

	getElements() {
		this.textArea = document.getElementById(
			'note-body'
		) as HTMLTextAreaElement;

		this.colorPicker = document.getElementById(
			'note-color'
		) as HTMLInputElement;

		this.noteCreator = document.getElementById(
			'note-creator'
		) as HTMLDivElement;
	}

	applyEvents() {
		this.textArea.addEventListener('input', () => {
			this.textArea.style.height = '48px';
			this.textArea.style.height = `${this.textArea.scrollHeight}px`;
		});

		this.textArea.addEventListener('keydown', function (e) {
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

		this.colorPicker.addEventListener(
			'input',
			(e) =>
				(this.noteCreator.style.backgroundColor = (
					e.target as HTMLInputElement
				).value)
		);
	}
}
