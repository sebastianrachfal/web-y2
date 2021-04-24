class Line {
	startTime: number;
	sounds: Note[] = [];

	recording: boolean = false;
	timeouts: number[] = [];

	playButton: HTMLButtonElement;
	recordButton: HTMLButtonElement;
	clearButton: HTMLButtonElement;
	trackLine: HTMLDivElement;

	playSoundByLetter: (string) => void;

	constructor(
		pb: HTMLButtonElement,
		rb: HTMLButtonElement,
		cb: HTMLButtonElement,
		tl: HTMLDivElement,
		ps: (string) => void
	) {
		this.playButton = pb;
		this.recordButton = rb;
		this.clearButton = cb;
		this.trackLine = tl;
		this.playSoundByLetter = ps;
		this.addEvents();
	}

	addEvents() {
		this.playButton.addEventListener('click', (e) => {
			const playing = this.playButton.innerText == 'Play';

			if (playing && this.sounds.length == 0) return;

			this.playButton.innerText = playing ? 'Stop' : 'Play';

			if (playing) this.play();
			else this.stop();

			this.recordButton.innerText = 'Record';
			this.recording = false;
		});

		this.recordButton.addEventListener('click', (e) => {
			this.recording = !this.recording;
			if (this.recording) {
				console.log('clear');
				this.clear();
				this.startTime = Date.now();
			}
			this.recordButton.innerText = this.recording ? 'Finish' : 'Record';
		});

		this.clearButton.addEventListener('click', (e) => this.clear());
	}

	stop() {
		for (let interval of this.timeouts) window.clearInterval(interval);
		this.clearTrackLine();
	}

	clear() {
		this.playButton.innerText = 'Play';
		this.recordButton.innerText = 'Record';
		this.trackLine.style.width = '';
		this.sounds = [];
		this.startTime = undefined;

		this.stop();
	}

	triggerSound(note) {
		if (!this.recording) return;
		this.sounds.push(new Note(Date.now(), note));
	}

	clearTrackLine() {
		this.timeouts = [];
		setTimeout(() => {
			this.trackLine.style.transition = 'width .2s';
			this.trackLine.style.width = '0%';
		}, 800);
	}

	play() {
		if (this.sounds.length === 0 || this.timeouts.length > 0) return;

		const lineTime =
			this.sounds[this.sounds.length - 1].time - this.startTime + 100;
		this.trackLine.style.transition = `width ${(lineTime / 1000).toFixed(
			1
		)}s linear`;
		this.trackLine.style.width = '100%';

		window.setTimeout(() => {
			this.clearTrackLine();
			this.playButton.innerText = 'Play';
		}, lineTime);
		for (const sound of this.sounds) {
			this.timeouts.push(
				window.setTimeout(
					() => this.playSoundByLetter(sound.note),
					sound.time - this.startTime
				)
			);
		}
	}
}
