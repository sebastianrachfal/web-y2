import AppStorage from '@/interfaces/IAppStorage';
import AppData from '@/types/AppData';
import config from '@/config';
import { uuid } from '@/helpers';
import profiler from '@/decorators/profiler';

export default class LocalStorage implements AppStorage {
	@profiler
	saveData(data: AppData) {
		const curData = JSON.parse(
			localStorage.getItem(config.LOCAL_STORAGE_KEY) || '{}'
		);
		localStorage.setItem(
			config.LOCAL_STORAGE_KEY,
			JSON.stringify({ ...curData, ...data })
		);
	}

	@profiler
	readData(): Promise<AppData> {
		return new Promise((resolve) =>
			resolve(
				(JSON.parse(
					localStorage.getItem(config.LOCAL_STORAGE_KEY) || '{}'
				) || {
					userId: uuid(),
					notes: [],
				}) as AppData
			)
		);
	}
}
