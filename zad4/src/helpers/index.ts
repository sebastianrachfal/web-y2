function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			let r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
}

const getColorFromTime = (time: number): string =>
	`color: ${
		time < 2 ? '#50FA7B' : time >= 2 && time < 2.5 ? '#F1FA8C' : '#FF5555'
	}`;

export { uuid, getColorFromTime };
