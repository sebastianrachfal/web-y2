const API_KEY = '503521ccf7b05b55d71724b96bd67f4d';
const STORAGE_KEY = 'rachfal-weather';

const queryByCityName = (city) =>
	`https://api.openweathermap.org/data/2.5/weather/?q=${encodeURIComponent(
		city
	)}&lang=pl&units=metric&l&appid=${API_KEY}`;
class Main {
	cities: City[] = [];
	backupCities: City[] = [];
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
		this.cities = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || []).map(
			(city) => new City(city)
		);

		this.updateView();
	}

	saveData() {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(
				this.cities.length === 0 ? this.backupCities : this.cities
			)
		);
	}

	updateAll() {
		const names = this.cities.map(({ name }) => name);

		console.log('Update cities', this.cities);

		this.backupCities = [...this.cities];
		this.cities = [];

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

				this.cities.push(
					new City({
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
		return !!this.cities.find((city) => city.name === name);
	}

	updateView() {
		this.cities = this.cities.sort((a, b) => (a.name > b.name ? 1 : -1));
		this.cityContainer.innerHTML = this.cities
			.map((city) => city.getHTML())
			.join('');
	}

	deleteCard(name: string) {
		this.cities = this.cities.filter((city) => city.name !== name);
		this.backupCities = this.backupCities.filter(
			(city) => city.name !== name
		);

		this.updateView();
	}
}

const _main = new Main();
