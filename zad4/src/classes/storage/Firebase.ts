import firebase from 'firebase/app';
import 'firebase/database';

import AppStorage from '@/interfaces/IAppStorage';
import AppData from '@/types/AppData';
import config from '@/config';
import { uuid } from '@/helpers';
import profiler from '@/decorators/profiler';

export default class Firebase implements AppStorage {
	userId: string;
	ref: firebase.database.Reference;

	@profiler
	initialize() {
		const app = firebase.initializeApp(config.FIREBASE_CONFIG);

		const savedAppData = JSON.parse(
			localStorage.getItem(config.LOCAL_STORAGE_KEY) || '{}'
		) as AppData;

		const appData =
			savedAppData?.userId?.length > 0
				? savedAppData
				: { userId: uuid(), notes: [] };

		this.userId = appData.userId;

		localStorage.setItem(config.LOCAL_STORAGE_KEY, JSON.stringify(appData));

		this.ref = firebase.database(app).ref(`notebooks/${this.userId}`);
	}

	@profiler
	saveData(data: AppData) {
		if (data?.notes.length > 0)
			this.ref.set({
				notes: data?.notes,
			});
		else this.ref.set({});
	}

	@profiler
	readData(): Promise<AppData> {
		return new Promise((resolve) =>
			this.ref
				.get()
				.then((data) => resolve(data.val() as AppData))
				.catch((err) => {
					console.error(err);
					resolve({ notes: [] });
				})
		);
	}
}
