import AppData from '@/types/AppData';

export default interface IAppStorage {
	initialize?(): void;
	saveData(data: AppData): void;
	readData(): Promise<AppData>;
}
