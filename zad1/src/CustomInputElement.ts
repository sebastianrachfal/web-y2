class CustomInputElement {
	id: number;
	liEl: HTMLLIElement;
	inputEl: HTMLInputElement;
	btnEl: HTMLButtonElement;

	remove: Function;
	update: Function;

	constructor(id: number, rm: (n: number) => void, up: () => void) {
		this.id = id;
		this.remove = rm;
		this.update = up;
		this.populateElements();
	}

	populateElements() {
		this.inputEl = document.createElement('input');
		this.inputEl.type = 'number';
		this.inputEl.addEventListener('change', () => this.update());

		this.btnEl = document.createElement('button');
		this.btnEl.innerText = 'X';
		this.btnEl.addEventListener('click', () => this.remove(this.id));

		this.liEl = document.createElement('li');
		this.liEl.appendChild(this.inputEl);
		this.liEl.appendChild(this.btnEl);
	}

	public getElement(): HTMLLIElement {
		return this.liEl;
	}
}
