class CustomInputElement {
	id: number;
	liEl: HTMLLIElement;
	inputEl: HTMLInputElement;
	chkEl: HTMLInputElement;
	checked: boolean;
	remove: Function;
	update: Function;

	constructor(id: number, rm: (n: number, c: boolean) => void, up: () => void) {
		this.id = id;
		this.remove = rm;
		this.update = up;
		this.populateElements();
	}

	populateElements() {
		this.inputEl = document.createElement('input');
		this.inputEl.type = 'number';
		this.inputEl.addEventListener('keyup', () => this.update());
		this.inputEl.addEventListener('change', () => this.update());

		this.chkEl = document.createElement('input');
		this.chkEl.type = 'checkbox';
		this.chkEl.addEventListener('click', () => this.remove(this.id, (this.checked = !this.checked)));

		this.liEl = document.createElement('li');
		this.liEl.appendChild(this.inputEl);
		this.liEl.appendChild(this.chkEl);
	}

	public getElement(): HTMLLIElement {
		return this.liEl;
	}
}
