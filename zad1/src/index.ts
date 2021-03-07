class Main {
	amoEl: HTMLInputElement;
	setEl: HTMLInputElement;

	sumEl: HTMLInputElement;
	avgEl: HTMLInputElement;
	minEl: HTMLInputElement;
	maxEl: HTMLInputElement;

	inputContainer: HTMLUListElement;

	inputs: CustomInputElement[];

	constructor() {
		this.addItems = this.addItems.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.getElements();
		console.log(this.setEl);
		this.setEl.addEventListener('click', this.addItems);
	}
	getElements() {
		this.amoEl = document.querySelector('#amo');
		this.setEl = document.querySelector('#set');

		this.sumEl = document.querySelector('#sum');
		this.avgEl = document.querySelector('#avg');
		this.minEl = document.querySelector('#min');
		this.maxEl = document.querySelector('#max');

		this.inputContainer = document.querySelector('#fields');
	}
	calculateData() {
		console.log('init');
	}
	addItems() {
		let num;
		if ((num = parseInt(this.amoEl.value)) == NaN || num < 0) return window.alert('Invalid number');
		this.inputs = [];
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
		if (values.length == 0) return;
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
	removeItem(n: number) {}
	displayResults(sum: number, avg: number, min: number, max: number) {
		this.sumEl.value = '' + sum;
		this.avgEl.value = '' + avg;
		this.minEl.value = '' + min;
		this.maxEl.value = '' + max;
	}
}
new Main();
