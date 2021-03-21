class Main {
	amoEl: HTMLInputElement;
	setEl: HTMLButtonElement;
	rmEl: HTMLButtonElement;

	sumEl: HTMLInputElement;
	avgEl: HTMLInputElement;
	minEl: HTMLInputElement;
	maxEl: HTMLInputElement;

	inputContainer: HTMLUListElement;

	inputs: CustomInputElement[];
	inputsToRemove: number[];

	loaders: NodeListOf<HTMLImageElement>;

	constructor() {
		this.inputsToRemove = [];
		this.addItems = this.addItems.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.removeSelected = this.removeSelected.bind(this);

		this.getElements();

		this.setEl.addEventListener('click', this.addItems);
		this.rmEl.addEventListener('click', this.removeSelected);
		this.displayResults(0, 0, 0, 0);
	}
	removeSelected() {
		if (this.inputsToRemove.length === 0) return;

		for (let index of this.inputsToRemove.sort((a, b) => b - a)) {
			this.inputContainer.removeChild(this.inputs[index].liEl);
			this.inputs.splice(index, 1);
		}

		this.inputsToRemove = [];
		this.updateItems();
	}
	getElements() {
		this.amoEl = document.querySelector('#amo');
		this.setEl = document.querySelector('#set');
		this.rmEl = document.querySelector('#rm');

		this.sumEl = document.querySelector('#sum');
		this.avgEl = document.querySelector('#avg');
		this.minEl = document.querySelector('#min');
		this.maxEl = document.querySelector('#max');

		this.inputContainer = document.querySelector('#fields');

		this.loaders = document.querySelectorAll('img');
	}
	addItems() {
		let num;

		if ((num = parseInt(this.amoEl.value)) == NaN || num < 0) return window.alert('Invalid number');

		this.inputs = [];
		this.inputsToRemove = [];
		this.inputContainer.innerHTML = '';
		this.updateItems();

		for (let i = 0; i < num; i++)
			this.inputContainer.appendChild(
				this.inputs[
					this.inputs.push(new CustomInputElement(i, this.removeItem, this.updateItems)) - 1
				].getElement()
			);
	}
	updateItems() {
		let values = this.inputs.filter((input) => input.inputEl.value.length > 0).map((input) => +input.inputEl.value);

		if (values.length == 0) return this.changeLoaderState(true);

		this.changeLoaderState(false);

		let sum = 0,
			min = values[0],
			max = values[0];

		for (let item of values) {
			console.log(item);
			sum += item;
			if (item < min) min = item;
			if (item > max) max = item;
		}

		this.displayResults(sum, sum / values.length, min, max);
	}
	changeLoaderState(visible: boolean) {
		for (let input of [this.sumEl, this.avgEl, this.minEl, this.maxEl])
			input.style.visibility = visible ? 'hidden' : 'visible';
		for (let img of this.loaders) img.style.visibility = visible ? 'visible' : 'hidden';
	}
	removeItem(n: number, add: boolean) {
		if (add) {
			let index = this.inputs.map((input) => input.id).indexOf(n);
			this.inputsToRemove.push(index);
		} else this.inputsToRemove.splice(this.inputsToRemove.indexOf(n), 1);
		console.log(this.inputsToRemove);
	}
	displayResults(sum: number, avg: number, min: number, max: number) {
		this.sumEl.value = '' + sum.toFixed(2);
		this.avgEl.value = '' + avg.toFixed(2);
		this.minEl.value = '' + min.toFixed(2);
		this.maxEl.value = '' + max.toFixed(2);
	}
}

new Main();
