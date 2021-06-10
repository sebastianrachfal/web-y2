import AppStorage from '@/interfaces/IAppStorage';
import AppData from '@/types/AppData';
import config from '@/config';
export default class LocalStorage implements AppStorage {
	initialize() {}

	saveData(data: AppData) {
		console.log('save');
	}

	readData() {
		return JSON.parse(
			localStorage.getItem(config.LOCAL_STORAGE_KEY)
		) as AppData;
	}
}
