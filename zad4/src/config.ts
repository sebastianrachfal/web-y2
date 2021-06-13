import AppParams from '@/types/AppParams';
import StorageType from '@/types/StorageType';

const CONFIG: AppParams = {
	STORAGE_TYPE: StorageType.Firebase,
	LOCAL_STORAGE_KEY: 'rachfal-notes',
	PROFILING: true,
	FIREBASE_CONFIG: {
		apiKey: 'AIzaSyD_oeIq9VP0SUAa0ILIe8v255A125UPwRI',
		authDomain: 'notes-rachfal.firebaseapp.com',
		projectId: 'notes-rachfal',
		storageBucket: 'notes-rachfal.appspot.com',
		messagingSenderId: '223662127534',
		appId: '1:223662127534:web:daf41d7acd8c081af0f03f',
		databaseURL:
			'https://notes-rachfal-default-rtdb.europe-west1.firebasedatabase.app/',
	},
};

export default CONFIG;
