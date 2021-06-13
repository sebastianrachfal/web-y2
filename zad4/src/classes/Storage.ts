import config from '@/config';
import profiler from '@/decorators/profiler';
import IAppStorage from '@/interfaces/IAppStorage';
import { INote } from '@/interfaces/INote';
import Firebase from '@/storage/Firebase';
import LocalStorage from '@/storage/LocalStorage';
import AppData from '@/types/AppData';
import StorageType from '@/types/StorageType';
import Note from './Note';

export default class Storage {
	storageClass: IAppStorage;

	@profiler
	init(): Promise<Note[]> {
		switch (config.STORAGE_TYPE) {
			case StorageType.LocalStorage:
				this.storageClass = new LocalStorage();
				break;

			case StorageType.Firebase:
				this.storageClass = new Firebase();
				break;
		}

		this.storageClass.initialize?.();

		return this.readData();
	}

	@profiler
	mapNotes(data: INote[]) {
		return data?.map((note: INote) => new Note(note));
	}

	@profiler
	readData(): Promise<Note[]> {
		return new Promise((resolve) => {
			this.storageClass
				.readData()
				.then((data: AppData) =>
					resolve(this.mapNotes(data?.notes) || [])
				);
		});
	}

	@profiler
	saveData(notes: Note[]) {
		this.storageClass.saveData({ notes: notes || [] });
	}
}
