const API_KEY = '503521ccf7b05b55d71724b96bd67f4d';
const STORAGE_KEY = 'rachfal-weather';

const queryByCityName = (city) =>
	`https://api.openweathermap.org/data/2.5/weather/?q=${encodeURIComponent(
		city
	)}&lang=pl&units=metric&l&appid=${API_KEY}`;
class Main {
	notes: Note[] = [];
	backupCities: Note[] = [];
	cityInput: HTMLInputElement;
	cityContainer: HTMLDivElement;

	constructor() {
		this.cityInput = document.getElementById(
			'city-name'
		) as HTMLInputElement;

		this.cityContainer = document.getElementById(
			'city-container'
		) as HTMLDivElement;

		document
			.getElementById('add-button')
			.addEventListener('click', () =>
				this.handleCityAdd(this.cityInput.value.trim())
			);

		this.cityInput.addEventListener(
			'keydown',
			(e) =>
				e.key === 'Enter' &&
				this.handleCityAdd(this.cityInput.value.trim())
		);

		window.addEventListener('unload', () => this.saveData());

		this.loadData();
		this.updateAll();

		setInterval(() => this.updateAll(), 30000);
	}

	loadData() {
		this.notes = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || []).map(
			(note) => new Note(note)
		);

		this.updateView();
	}

	saveData() {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(
				this.notes.length === 0 ? this.backupCities : this.notes
			)
		);
	}

	updateAll() {
		const names = this.notes.map(({ name }) => name);

		console.log('Update cities', this.notes);

		this.backupCities = [...this.notes];
		this.notes = [];

		names.forEach((name) => this.handleCityAdd(name));
	}

	handleCityAdd(value: string) {
		if (value.length === 0) return;

		fetch(queryByCityName(value))
			.then((res) => res.json())
			.then((data) => {
				if (data.cod !== 200) return this.flashInput('#f1b1b1');

				const {
					name,
					weather,
					sys: { country },
					main: { pressure, temp },
					wind: { speed },
				} = data;

				if (this.isNameInCities(name))
					return this.flashInput('#b1bff1');

				this.notes.push(
					new Note({
						name,
						country,
						temp,
						pressure,
						windSpeed: speed,
						weatherType: weather?.[0]?.icon,
					})
				);

				this.cityInput.value = '';
				this.updateView();
			});
	}

	flashInput(color: string) {
		this.cityInput.style.backgroundColor = color;
		setTimeout(
			() => (this.cityInput.style.backgroundColor = '#f5f0e1'),
			250
		);
	}

	isNameInCities(name: string) {
		return !!this.notes.find((city) => city.name === name);
	}

	updateView() {
		this.notes = this.notes.sort((a, b) => (a.name > b.name ? 1 : -1));
		this.cityContainer.innerHTML = this.notes
			.map((city) => city.getHTML())
			.join('');
	}

	deleteCard(name: string) {
		this.notes = this.notes.filter((city) => city.name !== name);
		this.backupCities = this.backupCities.filter(
			(city) => city.name !== name
		);

		this.updateView();
	}
}

const _main = new Main();
