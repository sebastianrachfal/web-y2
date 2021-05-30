import AppData from '../types/AppData';

export default interface AppStorage {
	initialize(): void;
	saveData(data: AppData): void;
	readData(): AppData;
}
