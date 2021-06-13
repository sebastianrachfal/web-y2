import StorageType from '@/types/StorageType';
import { FirebaseConfigType } from './FirebaseConfigType';

interface AppParams {
	STORAGE_TYPE: StorageType;
	LOCAL_STORAGE_KEY?: string;
	PROFILING: boolean;
	FIREBASE_CONFIG: FirebaseConfigType;
}

export default AppParams;
