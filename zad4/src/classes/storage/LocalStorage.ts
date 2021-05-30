import AppStorage from '../../interfaces/AppStorage';
import AppData from '../../types/AppData';

export default class LocalStorage implements AppStorage {
	initialize() {
		console.log('init');
	}

	saveData(data: AppData) {
		console.log('save');
	}

	readData() {
		return { notes: [] } as AppData;
	}
}
